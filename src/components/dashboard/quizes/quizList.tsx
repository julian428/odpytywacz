import { SearchIcon } from "@/lib/icons";
import Container from "../../ui/container";
import QuizLink from "./quizLink";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import H3 from "@/components/ui/headings/h3";

interface Props {
  filter?: string;
}

async function getQuizes(uid?: string | null, filter?: string) {
  if (!uid) return null;
  try {
    const quizes = await prisma.quiz.findMany({
      where: {
        AND: [
          {
            OR: [{ ownerId: uid }, { contributors: { has: uid } }],
          },
          { title: { contains: filter } },
        ],
      },
      select: {
        id: true,
      },
    });
    return quizes.map((friend) => friend.id);
  } catch (error) {
    return null;
  }
}

export default async function QuizList({ filter }: Props) {
  const session = await getServerSession(authOptions);
  const quizes = await getQuizes(session?.user?.id, filter);
  return (
    <Container
      variant="solid-light"
      className="w-full lg:w-[400px] h-80 lg:h-[650px] flex flex-col items-center py-4 px-8"
    >
      <form className="mb-4 relative">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="wyszukaj…"
              name="q"
              autoComplete="off"
              defaultValue={filter}
              className="input bg-accent focus:ring-0"
            />
            <button className="btn btn-square btn-accent text-2xl">
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
      <section className="max-h-full pt-6 overflow-y-auto w-full flex flex-col items-center space-y-8">
        {!quizes ? (
          <H3>brak quizów</H3>
        ) : (
          quizes.map((quiz) => {
            return (
              <Suspense
                key={quiz}
                fallback={
                  <Container
                    variant="solid-light"
                    opacity="full"
                    className="w-full h-[84px] py-6 px-4 flex justify-between items-center animate-pulse"
                  />
                }
              >
                {/* @ts-expect-error Async Server Component*/}
                <QuizLink
                  uid={session?.user?.id}
                  qid={quiz}
                />
              </Suspense>
            );
          })
        )}
      </section>
    </Container>
  );
}
