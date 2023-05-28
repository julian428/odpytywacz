import H3 from "@/components/ui/headings/h3";
import prisma from "@/lib/db";
import { RemovePersonIcon } from "@/lib/icons";
import { revalidatePath } from "next/cache";

interface Props {
  fid: string;
  uid: string;
}

async function getFriend(id: string) {
  try {
    const friend = await prisma.user.findUnique({
      where: { id },
      select: { name: true },
    });
    await prisma.$disconnect();
    return friend?.name;
  } catch (error) {
    return null;
  }
}

export default async function UserCard({ fid, uid }: Props) {
  const fname = await getFriend(fid);
  if (!fname) return;

  const removeFriend = async (data: FormData) => {
    "use server";

    const userId = data.get("user") as string | null;
    const friendId = data.get("friend") as string | null;

    if (!userId) throw new Error("Nie jesteś zalogowany.");
    if (!friendId) throw new Error("Taki użytkownik nie istnieje.");

    try {
      const friend = await prisma.user.findUnique({
        where: { id: friendId },
        select: { friends: true },
      });
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { friends: true },
      });

      await prisma.$disconnect();

      if (!friend) throw new Error("Taki użytkownik nie istnieje.");
      if (!user) throw new Error("Twoje konto nie istnieje.");

      const newFriendFriends = friend.friends.filter((user) => user !== userId);
      const newUserFriends = user.friends.filter((user) => user !== friendId);

      await prisma.$transaction([
        prisma.user.update({
          where: { id: friendId },
          data: { friends: newFriendFriends },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { friends: newUserFriends },
        }),
      ]);
      await prisma.$disconnect();
      revalidatePath("/profile");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <form
      className="flex justify-between items-center"
      action={removeFriend}
      method="post"
    >
      <H3>{fname}</H3>
      <input
        type="hidden"
        name="friend"
        value={fid}
      />
      <input
        type="hidden"
        name="user"
        value={uid}
      />
      <button className="text-accent">
        <RemovePersonIcon className="text-2xl" />
      </button>
    </form>
  );
}
