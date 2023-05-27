import Container from "@/components/ui/container";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import UserCard from "./userCard";

async function getFriends(uid: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: { friends: true },
    });
    return user?.friends || [];
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

interface Props {
  page: string;
  filter?: string;
}

export default async function List({ page, filter }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    throw new Error("Nie jesteś zalogowany.");
  const friends = await getFriends(session.user.id);
  return (
    <Container className="h-[500px] w-[400px] p-4 space-y-2">
      {friends.map((friend, i) => {
        return (
          <Suspense
            key={friend}
            fallback={<Container className="w-full h-[36px] animate-pulse" />}
          >
            {/* @ts-expect-error Async Server Component*/}
            <UserCard
              fid={friend}
              uid={session.user?.id || ""}
            />
          </Suspense>
        );
      })}
    </Container>
  );
}
