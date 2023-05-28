import H3 from "@/components/ui/headings/h3";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";
import { AddPersonIcon } from "@/lib/icons";
import { revalidatePath } from "next/cache";

interface Props {
  fid: string;
  qid: string;
}

async function getFriend(id: string) {
  try {
    const friend = await prisma.user.findUnique({
      where: { id },
      select: { name: true, id: true },
    });
    return friend;
  } catch (error) {
    return null;
  }
}

export default async function FriendCard({ fid, qid }: Props) {
  const friend = await getFriend(fid);
  if (!friend) return;

  const addToContributors = async (data: FormData) => {
    "use server";

    try {
      await prisma.quiz.update({
        where: { id: qid },
        data: {
          contributors: { push: fid },
        },
      });
      revalidatePath(`/quizes/${qid}/edit`);
    } catch (error) {
      throw new Error("Coś poszło nie tak. Przy dodawaniu wspólnika.");
    }
  };

  return (
    <form
      action={addToContributors}
      method="post"
      className="flex justify-between"
    >
      <H3>{friend.name}</H3>
      <SubmitToast
        message="dodano do wspólników"
        className="text-accent"
      >
        <AddPersonIcon className="text-3xl" />
      </SubmitToast>
    </form>
  );
}
