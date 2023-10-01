import prisma from "@/lib/db";
import SubmitToast from "../ui/serverSubmit";

interface Props {
  blogId: string;
}

async function getAccent(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        accent: true,
      },
    });
    return blog?.accent;
  } catch (error) {
    return null;
  }
}

export default async function ChangeColor({ blogId }: Props) {
  const accent = (await getAccent(blogId)) || "#000000";

  const updateAccent = async (data: FormData) => {
    "use server";
    const id = data.get("id") as string | null;
    const color = data.get("color") as string | null;

    if (!id) return;

    const revalidatePath = (await import("next/cache")).revalidatePath;

    try {
      await prisma.blog.update({ where: { id }, data: { accent: color } });
    } catch (error) {}

    revalidatePath(`/blogs/${id}/edit`);
  };

  return (
    <form
      action={updateAccent}
      className="flex flex-col gap-1"
    >
      <label htmlFor="color">akcent</label>
      <input
        type="hidden"
        name="id"
        value={blogId}
      />
      <input
        type="color"
        name="color"
        defaultValue={accent}
        className="input w-full"
      />
      <SubmitToast
        message="zapisano kolor"
        className="btn btn-xs self-end"
      >
        zapisz
      </SubmitToast>
    </form>
  );
}
