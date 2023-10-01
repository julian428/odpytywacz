import SubmitToast from "@/components/ui/serverSubmit";
import H3 from "../../ui/headings/h3";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Props {
  qid: string;
}

export default function AddQuestion({ qid }: Props) {
  const createQuestion = async (data: FormData) => {
    "use server";
    const answears = data.getAll("answear") as string[];
    const question = data.get("question") as string | null;

    if (!question) return;

    try {
      await prisma.question.create({
        data: { quizId: qid, question, answears },
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
            maxLength={20}
            name={`answear`}
            className="w-full lg:w-[400px] h-[80px] input text-4xl"
          />
        ))}
      </section>
      <footer className="flex justify-evenly w-full">
        <button
          type="reset"
          className="btn btn-sm btn-outline px-4 w-1/5"
        >
          wyczyść
        </button>
        <SubmitToast
          message="dodano wiadomość"
          formAction={createQuestion}
          className="btn btn-sm px-4 w-1/5"
        >
          dodaj
        </SubmitToast>
      </footer>
    </form>
  );
}
