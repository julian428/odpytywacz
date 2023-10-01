import prisma from "@/lib/db";
import SubmitToast from "../ui/serverSubmit";

interface Props {
  blogId: string;
}

async function getTitle(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { title: true },
    });
    return blog?.title;
  } catch (error) {
    return null;
  }
}

export default async function EditTitle({ blogId }: Props) {
  const title = await getTitle(blogId);

  const updateTitle = async (data: FormData) => {
    "use server";

    const newTitle = data.get("title") as string | null;

    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: { title: newTitle || "" },
      });
    } catch (error) {}
  };

  return (
    <form
      className="flex flex-col items-end gap-1"
      action={updateTitle}
    >
      <label
        htmlFor="title"
        className="self-start"
      >
        tytuł
      </label>
      <input
        id="title"
        type="text"
        name="title"
        maxLength={30}
        defaultValue={title || ""}
        className="input w-full text-xl"
      />
      <SubmitToast
        message="zapisano tytuł"
        className="btn btn-xs"
      >
        zapisz
      </SubmitToast>
    </form>
  );
}
