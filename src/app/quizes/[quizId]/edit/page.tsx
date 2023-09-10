import Contributors from "@/components/edit-quiz/contributors";
import Essentials from "@/components/edit-quiz/essentials";
import Questions from "@/components/edit-quiz/questions";
import Stats from "@/components/edit-quiz/stats";
import Container from "@/components/ui/container";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

interface Props {
  params: {
    quizId: string;
  };
}

async function quizOwner(id: string) {
  try {
    const quiz = await prisma.quiz.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        ownerId: true,
      },
    });
    return quiz.ownerId;
  } catch (error) {
    return false;
  }
}

export default async function page({ params }: Props) {
  const ownerId = await quizOwner(params.quizId);
  const session = await getServerSession(authOptions);
  if (!ownerId || ownerId !== session?.user?.id) {
    (await import("next/navigation")).redirect(`/quizes/${params.quizId}`);
  }
  return (
    <article className="flex flex-col px-4 lg:px-0 lg:flex-row justify-center gap-16 lg:mt-8 pb-4">
      <Essentials qid={params.quizId} />
      <section className="space-y-4 lg:space-y-8">
        <Stats qid={params.quizId} />
        <Suspense
          fallback={
            <aside className="flex flex-col gap-4 items-center">
              <div className="btn btn-ghost">dodaj pytanie</div>
              <Container className="w-full p-4 h-[485px] max-w-[500px] animate-pulse" />
              <div className="btn btn-sm btn-error">usuń</div>
            </aside>
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <Questions qid={params.quizId} />
        </Suspense>
      </section>
      <Contributors qid={params.quizId} />
    </article>
  );
}
