import H3 from "@/components/ui/headings/h3";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  qid: string;
  id?: string | null;
}

async function getQuestion(id?: string | null) {
  if (!id) return null;
  try {
    const question = await prisma.question.findUnique({
      where: { id },
      select: { id: true, question: true, answears: true },
    });
    return question;
  } catch (error) {
    return null;
  }
}

export default async function EditQuestion({ qid, id }: Props) {
  if (!id) return;
  const question = await getQuestion(id);
  if (!question) return;

  const delQuestion = async (data: FormData) => {
    "use server";

    const questionId = data.get("questionId") as string | null;
    const qid = data.get("qid") as string | null;
    console.log(questionId);
    if (!questionId) return;

    try {
      await prisma.question.delete({ where: { id: questionId } });
      revalidatePath(`/quizes/${qid}/questions`);
    } catch (error) {
      throw new Error("Nie udało się usunąć pytania.");
    }
    redirect(`/quizes/${qid}/questions`);
  };

  const updateQuestion = async (data: FormData) => {
    "use server";

    const qid = data.get("qid") as string | null;
    const questionId = data.get("questionId") as string | null;
    const question = data.get("question") as string | null;
    const answears = data.getAll("answear") as string[];

    if (!question) return;
    if (!qid) throw new Error("Taki quiz nie istnieje.");
    if (!questionId) throw new Error("Takie pytanie nie istnieje.");

    try {
      await prisma.question.update({
        where: { id: questionId },
        data: {
          question,
          answears,
        },
      });
      revalidatePath(`/quizes/${qid}/questions`);
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <form className="flex flex-col items-center gap-4 text-3xl w-full lg:w-fit">
      <section className="text-right space-y-2">
        <header className="flex gap-2 items-end justify-end w-full">
          <p className="text-sm opacity-50">max 20 znaków</p>
          <H3>pytanie</H3>
        </header>
        <input
          type="hidden"
          name="qid"
          value={qid}
        />
        <input
          type="hidden"
          name="questionId"
          value={question.id}
        />
        <input
          defaultValue={question.question}
          maxLength={20}
          name="question"
          className="w-full lg:w-[400px] h-[80px] input text-4xl"
        />
      </section>
      <section className="flex flex-col gap-2">
        <header className="flex gap-2 items-end">
          <H3>odpowiedzi</H3>
          <p className="text-sm opacity-50">max 20 znaków</p>
        </header>
        {[...new Array(5)].map((_, i) => (
          <input
            key={`answearInput${i}`}
            defaultValue={question.answears[i]}
            maxLength={20}
            name={`answear`}
            className="w-full lg:w-[400px] h-[80px] input text-4xl"
          />
        ))}
      </section>
      <section className="flex justify-evenly items-center w-full">
        <SubmitToast
          message="usunięto pytanie"
          formAction={delQuestion}
          className="btn btn-outline btn-error btn-sm px-4"
        >
          usuń
        </SubmitToast>
        <SubmitToast
          message="dodano pytanie"
          formAction={updateQuestion}
          className="btn btn-sm px-4"
        >
          nadpisz
        </SubmitToast>
        <Link
          className="btn btn-outline btn-accent btn-sm px-4"
          href={`quizes/${qid}/questions`}
        >
          wróć
        </Link>
      </section>
    </form>
  );
}
