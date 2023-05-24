import Container from "../../ui/container";
import FriendCard from "./friendCard";
import { SearchIcon } from "@/lib/icons";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import H3 from "@/components/ui/headings/h3";
import { Suspense } from "react";

interface Props {
  filter?: string;
}

async function getFriends(filter?: string, uid?: string | null) {
  if (!uid) return null;
  try {
    const friends = await prisma.user.findMany({
      where: {
        AND: [{ friends: { has: uid } }, { name: { contains: filter } }],
      },
      select: { id: true },
    });
    return friends.map((friend) => friend.id);
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function FriendsList({ filter }: Props) {
  const session = await getServerSession(authOptions);
  const friends = await getFriends(filter, session?.user?.id);

  return (
    <section className="max-h-full pt-6 overflow-y-auto w-full flex flex-col items-center space-y-8">
      {!friends ? (
        <H3>brak znajomych</H3>
      ) : (
        friends.map((friend) => {
          return (
            <Suspense
              fallback={
                <Container
                  variant="solid-dark"
                  opacity="full"
                  className="w-full h-[84px] animate-pulse py-6 px-4 flex items-center justify-between"
                />
              }
              key={friend}
            >
              {/* @ts-expect-error Async Server Component*/}
              <FriendCard
                fid={friend}
                uid={session?.user?.id}
              />
            </Suspense>
          );
        })
      )}
    </section>
  );
}
