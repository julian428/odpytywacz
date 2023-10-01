import H3 from "@/components/ui/headings/h3";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getQuizTitle(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { title: true },
    });

    return quiz?.title || "";
  } catch (error) {
    return "";
  }
}

export default async function Title({ qid }: Props) {
  const title = await getQuizTitle(qid);

  const updateTitle = async (data: FormData) => {
    "use server";

    const title = data.get("title") as string | null;
    if (!title) return;

    try {
      await prisma.quiz.update({
        where: { id: qid },
        data: { title },
      });
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <form
      method="post"
      action={updateTitle}
      className="flex flex-col w-full lg:w-fit items-end gap-2"
    >
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>tytuł</H3>
      </label>
      <input
        type="text"
        id="title-change"
        name="title"
        defaultValue={title}
        maxLength={20}
        className="input w-full lg:w-[400px] h-[80px] text-4xl"
      />

      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 20 znaków</p>
        <SubmitToast
          message="zapisano tytuł"
          className="btn btn-sm mr-4"
        >
          zapisz
        </SubmitToast>
      </footer>
    </form>
  );
}
