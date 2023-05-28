import H3 from "@/components/ui/headings/h3";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getTopic(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { topic: true },
    });
    return quiz?.topic || "";
  } catch (error) {
    return "";
  }
}

export default async function Topic({ qid }: Props) {
  const topic = await getTopic(qid);

  const updateTopic = async (data: FormData) => {
    "use server";

    const topic = data.get("topic") as string | null;
    if (!topic) return;

    try {
      await prisma.quiz.update({
        where: { id: qid },
        data: { topic },
      });
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <form
      method="post"
      action={updateTopic}
      className="flex flex-col w-full lg:w-fit items-end gap-2"
    >
      <label
        htmlFor="topic-change"
        className="mr-4"
      >
        <H3>temat</H3>
      </label>
      <input
        id="topic-change"
        maxLength={20}
        defaultValue={topic}
        name="topic"
        type="text"
        className="w-full lg:w-[400px] h-[80px] text-4xl input"
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 20 znaków</p>
        <SubmitToast
          message="zapisano temat"
          className="btn btn-sm mr-4"
        >
          zapisz
        </SubmitToast>
      </footer>
    </form>
  );
}
