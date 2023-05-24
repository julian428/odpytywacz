import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import prisma from "@/lib/db";
import { RemovePersonIcon } from "@/lib/icons";
import { revalidatePath } from "next/cache";

interface Props {
  fid: string;
  uid?: string | null;
}

async function getFriend(id: string) {
  try {
    const friend = await prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true },
    });
    return friend;
  } catch (error) {
    return null;
  }
}

export default async function FriendCard({ fid, uid }: Props) {
  const friend = await getFriend(fid);
  if (!friend) return;

  async function removeFriend(data: FormData) {
    "use server";
    const fid = data.get("friend") as string | null;
    const uid = data.get("user") as string | null;

    if (!uid) throw new Error("Nie jesteś zalogowany.");
    if (!fid) throw new Error("Taki znajomy nie istnieje.");

    const userFriends = await prisma.user.findUnique({
      where: { id: uid },
      select: { friends: true },
    });
    const friendFriends = await prisma.user.findUnique({
      where: { id: fid },
      select: { friends: true },
    });

    if (!userFriends) throw new Error("Twoje konto nie istnieje.");
    if (!friendFriends) throw new Error("Ten znajomy nie istnieje.");

    const newUserFriends = userFriends.friends.filter(
      (friend) => friend !== fid
    );
    const newFriendFriends = friendFriends.friends.filter(
      (user) => user != uid
    );

    await prisma.$transaction([
      prisma.user.update({
        where: { id: uid },
        data: { friends: newUserFriends },
      }),
      prisma.user.update({
        where: { id: fid },
        data: { friends: newFriendFriends },
      }),
    ]);
    revalidatePath("/dashboard");
  }

  return (
    <Container
      variant="solid-dark"
      opacity="full"
      className="w-full py-6 px-4 flex items-center justify-between"
    >
      <H3>{friend.name}</H3>
      <form
        action={removeFriend}
        method="post"
        className="flex justify-between items-center"
      >
        <button>
          <RemovePersonIcon className="text-4xl" />
        </button>
        <input
          type="hidden"
          value={fid}
          name="friend"
        />
        <input
          type="hidden"
          value={uid || ""}
          name="user"
        />
      </form>
    </Container>
  );
}
