import Quiz from "@/components/quiz";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import PointsProvider from "@/providers/points";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface Props {
  params: {
    quizId: string;
  };
}

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
      },
      select: {
        _count: {
          select: {
            Questions: true,
          },
        },
        title: true,
        Owner: {
          select: {
            name: true,
          },
        },
        id: true,
        Questions: {
          orderBy: { createdAt: "asc" },
          select: {
            answears: true,
            question: true,
            id: true,
          },
        },
      },
    });
    return quiz;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function page({ params }: Props) {
  const quiz = await getQuiz(params.quizId);
  if (!quiz) notFound();
  const session = await getServerSession(authOptions);
  return (
    <PointsProvider initKeys={quiz.Questions.map((question) => question.id)}>
      <Quiz
        quiz={quiz}
        uid={session?.user?.id}
      />
    </PointsProvider>
  );
}
