import prisma from "@/lib/db";
import SubmitToast from "../ui/serverSubmit";

interface Props {
  blogId: string;
}

async function getTopic(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { topic: true },
    });
    return blog?.topic;
  } catch (error) {
    return null;
  }
}

export default async function EditTopic({ blogId }: Props) {
  const topic = await getTopic(blogId);

  const updateTopic = async (data: FormData) => {
    "use server";

    const newTopic = data.get("topic") as string | null;

    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: { topic: newTopic || "" },
      });
    } catch (error) {}
  };

  return (
    <form
      action={updateTopic}
      className="flex flex-col items-end gap-1"
    >
      <label
        htmlFor="topic"
        className="self-start"
      >
        temat
      </label>
      <input
        type="text"
        id="topic"
        name="topic"
        defaultValue={topic || ""}
        className="input w-full text-xl"
      />
      <SubmitToast
        className="btn btn-xs"
        message="zapisano temat"
      >
        zapisz
      </SubmitToast>
    </form>
  );
}
