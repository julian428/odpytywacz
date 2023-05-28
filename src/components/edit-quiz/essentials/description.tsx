import H3 from "@/components/ui/headings/h3";
import Textarea from "@/components/ui/inputs/textarea";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getDescription(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { description: true },
    });
    await prisma.$disconnect();
    return quiz?.description || "";
  } catch (error) {
    return "";
  }
}

export default async function Description({ qid }: Props) {
  const description = await getDescription(qid);

  const updateDescription = async (data: FormData) => {
    "use server";
  };

  return (
    <form
      action={updateDescription}
      method="post"
      className="flex flex-col lg:w-fit w-full items-end gap-2"
    >
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>opis</H3>
      </label>
      <textarea
        id="title-change"
        defaultValue={description}
        maxLength={128}
        rows={10}
        className="lg:w-[400px] w-full text-xl textarea resize-none"
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 128 znaków</p>
        <SubmitToast
          message="zapisano opis."
          className="btn btn-sm mr-4"
        >
          zapisz
        </SubmitToast>
      </footer>
    </form>
  );
}
