import prisma from "@/lib/db";
import SubmitToast from "../ui/serverSubmit";

interface Props {
  blogId: string;
}

async function getPhotoLink(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { coverPhoto: true },
    });
    return blog?.coverPhoto;
  } catch (error) {
    return null;
  }
}

export default async function EditCoverPhoto({ blogId }: Props) {
  const photoLink = await getPhotoLink(blogId);

  const updatePhotoLink = async (data: FormData) => {
    "use server";

    const newPhotoLink = data.get("photo-link") as string | null;

    try {
      await prisma.blog.update({
        where: { id: blogId },
        data: { coverPhoto: newPhotoLink },
      });
    } catch (error) {}
  };

  return (
    <form
      action={updatePhotoLink}
      className="flex flex-col items-end gap-1"
    >
      <label
        htmlFor="photo"
        className="self-start"
      >
        zdjęcie
      </label>
      <input
        id="photo"
        type="text"
        name="photo-link"
        defaultValue={photoLink || ""}
        className="input w-full text-xl"
      />
      <SubmitToast
        className="btn btn-xs"
        message="zapisano zdjęcie"
      >
        zapisz
      </SubmitToast>
    </form>
  );
}
