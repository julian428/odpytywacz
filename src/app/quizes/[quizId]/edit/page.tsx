import Contributors from "@/components/edit-quiz/contributors";
import Essentials from "@/components/edit-quiz/essentials";
import Questions from "@/components/edit-quiz/questions";
import Stats from "@/components/edit-quiz/stats";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    quizId: string;
  };
}

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        title: true,
        topic: true,
        description: true,
        Questions: true,
        likes: true,
        timesPlayed: true,
        contributors: true,
      },
    });
    await prisma.$disconnect();
    return quiz;
  } catch (error) {
    return null;
  }
}

async function getContributors(ids?: string[]) {
  try {
    const contributors = await prisma.user.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        name: true,
      },
    });
    await prisma.$disconnect();
    return contributors;
  } catch (error) {
    return [];
  }
}

async function getFriends(uid?: string | null) {
  if (!uid) return [];
  try {
    const friendsIds = await prisma.user.findUnique({
      where: { id: uid },
      select: {
        friends: true,
      },
    });
    if (!friendsIds?.friends) return [];
    const friends = await prisma.user.findMany({
      where: {
        id: { in: friendsIds.friends },
      },
      select: {
        id: true,
        name: true,
      },
    });
    await prisma.$disconnect();
    return friends;
  } catch (error) {
    return [];
  }
}

export default async function page({ params }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const quiz = await getQuiz(params.quizId);
  if (!quiz) redirect("/dashboard");
  const contributors = await getContributors(quiz.contributors);
  const friends = await getFriends(session.user?.id);
  return (
    <article className="flex flex-col px-4 lg:px-0 lg:flex-row justify-center gap-16 lg:mt-12 pb-4">
      <Essentials
        qid={params.quizId}
        title={quiz.title}
        topic={quiz.topic}
        description={quiz.description}
      />
      <section className="space-y-4 lg:space-y-8">
        <Stats
          qid={params.quizId}
          questionCount={quiz.Questions.length}
          likes={quiz.likes}
          timesPlayed={quiz.timesPlayed}
        />
        <Questions
          qid={params.quizId}
          quizName={quiz.title}
          questions={quiz.Questions}
        />
      </section>
      <Contributors
        friends={friends}
        contributors={contributors}
        qid={params.quizId}
      />
    </article>
  );
}
