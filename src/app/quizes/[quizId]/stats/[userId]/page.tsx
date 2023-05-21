import Button from "@/components/ui/button";
import H1 from "@/components/ui/headings/h1";
import H2 from "@/components/ui/headings/h2";
import H4 from "@/components/ui/headings/h4";
import NavButtons from "@/components/user-stats/navButtons";
import RadialStats from "@/components/user-stats/radialStats";
import ScrollTo from "@/components/user-stats/scrollTo";
import Stats from "@/components/user-stats/stats";
import WrongQuestions from "@/components/user-stats/wrongQuestions";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    quizId: string;
    userId: string;
  };
}

async function getStats(uid: string, qid: string) {
  try {
    const stats = await prisma.userQuizStats.findFirst({
      where: {
        AND: [{ ownerId: uid }, { quizId: qid }],
      },
      select: {
        prevTime: true,
        avgPercentage: true,
        avgTime: true,
        candidateErrors: true,
        currentPercentage: true,
        currentTime: true,
        mostErrors: true,
        prevPercentage: true,
      },
    });
    return stats;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

async function getQuiz(qid: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: qid,
      },
      select: {
        id: true,
        title: true,
      },
    });
    return quiz;
  } catch (error) {
    return null;
  }
}

async function getQuestions(qid: string, questionIds: string[]) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: qid,
      },
      select: {
        Questions: {
          where: {
            id: { in: questionIds },
          },
          select: {
            id: true,
            answears: true,
            question: true,
          },
        },
      },
    });
    return quiz?.Questions || null;
  } catch (error) {
    return null;
  }
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    throw new Error("Zaloguj się aby dostać dokładne statystyki.");
  if (session.user.id !== params.userId) notFound();

  const stats = await getStats(params.userId, params.quizId);
  if (!stats) {
    return (
      <article className="flex flex-col justify-evenly items-center gap-16 mt-16">
        <H1>Brak statystyk</H1>
        <H4>zagraj w ten quiz przynajmniej raz aby je wygenerować.</H4>
        <Link href={`/quizes/${params.quizId}`}>
          <Button className="px-6">wróć</Button>
        </Link>
      </article>
    );
  }

  const quiz = await getQuiz(params.quizId);
  if (!quiz) notFound();

  let errors = await getQuestions(params.quizId, stats.mostErrors);

  if (!errors || errors.length < 1) {
    errors = await getQuestions(params.quizId, stats.candidateErrors);
  }

  const areErrors = !(errors === null || errors.length === 0);

  return (
    <article>
      <section className="flex flex-col lg:gap-16 gap-8 items-center mt-12">
        <header className="flex gap-4 items-end">
          <H1>{quiz.title}</H1>
        </header>
        <RadialStats stats={stats} />
        <Stats stats={stats} />
        <NavButtons quizId={params.quizId} />
        {areErrors && <ScrollTo destination={0} />}
      </section>
      {areErrors ? (
        <section className="h-screen pt-8 mt-24 text-center flex flex-col gap-8 items-center relative">
          <H1>{errors?.length} powtarzanych błędów</H1>
          <NavButtons quizId={params.quizId} />
          <WrongQuestions questions={errors!} />
        </section>
      ) : (
        <section className="text-center mt-8">
          <H2>Brak błędów</H2>
        </section>
      )}
    </article>
  );
}
