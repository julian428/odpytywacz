import prisma from "@/lib/db";
import H3 from "../../ui/headings/h3";
import { revalidatePath } from "next/cache";
import SubmitToast from "@/components/ui/serverSubmit";
import { AddPersonIcon } from "@/lib/icons";

interface Props {
  user: {
    id: string;
    name: string;
  };
  uid: string;
}

export default function AddFriendCard({ user, uid }: Props) {
  const addUser = async (data: FormData) => {
    "use server";

    const newFriendId = data.get("friend") as string | null;
    const userId = data.get("user") as string | null;

    if (!userId) throw new Error("Nie jesteś zalogowany.");
    if (!newFriendId)
      throw new Error("Użytkownik którego chcesz dodać nie istnieje.");

    try {
      const oldRequests = await prisma.friendRequest.findMany({
        where: {
          AND: [{ from: newFriendId }, { to: userId }],
        },
        select: {
          id: true,
        },
      });

      if (oldRequests.length > 0) {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { friends: { push: newFriendId } },
          }),
          prisma.user.update({
            where: { id: newFriendId },
            data: { friends: { push: userId } },
          }),
          prisma.friendRequest.deleteMany({
            where: {
              OR: [
                {
                  AND: [{ from: userId }, { to: newFriendId }],
                },
                {
                  AND: [{ from: newFriendId }, { to: userId }],
                },
              ],
            },
          }),
        ]);
      } else {
        const createdRequests = await prisma.friendRequest.findMany({
          where: {
            AND: [{ from: userId }, { to: newFriendId }],
          },
          select: {
            id: true,
          },
        });
        if (createdRequests.length < 1) {
          await prisma.friendRequest.create({
            data: {
              from: userId,
              to: newFriendId,
            },
          });
        }
      }
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    } finally {
      revalidatePath("/profile");
    }
  };

  return (
    <form
      className="flex justify-between items-center p-2"
      action={addUser}
      method="post"
    >
      <H3>{user.name}</H3>
      <input
        type="hidden"
        value={user.id}
        name="friend"
      />
      <input
        type="hidden"
        value={uid}
        name="user"
      />
      <div
        className="tooltip"
        data-tip="dodaj znajomego"
      >
        <SubmitToast message="wysłano zaproszenie">
          <AddPersonIcon className="text-2xl text-accent" />
        </SubmitToast>
      </div>
    </form>
  );
}
