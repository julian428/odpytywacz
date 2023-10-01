import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import AddFriendCard from "./addFriendCard";

interface Props {
  filter?: string;
}

async function getNonFriendUsers(uid: string, filter?: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: {
        id: true,
        friends: true,
      },
    });

    if (!user) throw new Error("Twoje konto nie istnieje.");
    const nonFriends = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: user.id } },
          { id: { notIn: user.friends } },
          { name: { contains: filter } },
        ],
      },
      select: {
        id: true,
        name: true,
      },
    });

    return nonFriends;
  } catch (error) {
    return [];
  }
}

export default async function GetFilteredUsers({ filter }: Props) {
  if (!filter)
    return (
      <p className="opacity-80 text-center mt-4">
        wyszukaj użytkownika po imieniu i nazwisku.
      </p>
    );
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    throw new Error("Nie jesteś zalogowany.");
  const nonFriendUsers = await getNonFriendUsers(
    session.user?.id || "",
    filter
  );
  return (
    <>
      {nonFriendUsers.map((nonFriend) => (
        <AddFriendCard
          user={nonFriend}
          key={nonFriend.id}
          uid={session.user?.id || ""}
        />
      ))}
    </>
  );
}
