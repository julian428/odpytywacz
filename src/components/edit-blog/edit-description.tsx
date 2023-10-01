import prisma from "@/lib/db";
import SubmitToast from "../ui/serverSubmit";

interface Props {
  blogId: string;
}

async function getDescription(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { description: true },
    });
    return blog?.description;
  } catch (error) {
    return null;
  }
}

export default async function EditDescription({ blogId }: Props) {
  const description = await getDescription(blogId);

  const updateDescription = async (data: FormData) => {
    "use server";

    const newDescription = data.get("description") as string | null;

    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: { description: newDescription },
      });
    } catch (error) {}
  };

  return (
    <form
      className="flex flex-col gap-1 items-end"
      action={updateDescription}
    >
      <label
        htmlFor="description"
        className="self-start"
      >
        opis
      </label>
      <textarea
        className="textarea resize-none w-full"
        rows={6}
        id="description"
        name="description"
        defaultValue={description || ""}
      />
      <SubmitToast
        message="zapisano opis"
        className="btn btn-xs"
      >
        zapisz
      </SubmitToast>
    </form>
  );
}
