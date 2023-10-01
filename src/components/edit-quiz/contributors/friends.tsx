import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import FriendCard from "./friendCard";
import { Suspense } from "react";

interface Props {
  qid: string;
}

async function getFriends(uid: string, qid: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: {
        friends: true,
      },
    });

    if (!user) throw new Error("Twoje konto nie istnieje.");
    const quiz = await prisma.quiz.findUnique({
      where: { id: qid },
      select: { contributors: true },
    });

    if (!quiz) throw new Error("Taki quiz nie istnieje");

    const notContributorsFriends = user.friends.filter(
      (friend) => !quiz.contributors.includes(friend)
    );

    return notContributorsFriends;
  } catch (error) {
    return [];
  }
}

export default async function FriendsList({ qid }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;
  const friends = await getFriends(session.user.id as string, qid);
  return (
    <Container className="w-full lg:w-96 h-32 p-4 overflow-y-auto">
      {friends.map((friend) => (
        <Suspense
          key={friend}
          fallback={<Container className="w-full h-9 animate-pulse mb-2" />}
        >
          {/* @ts-expect-error Async Server Component*/}
          <FriendCard
            fid={friend}
            qid={qid}
          />
        </Suspense>
      ))}
    </Container>
  );
}
