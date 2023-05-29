import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { quizId: string };
  searchParams: { q?: string };
}

async function getQuiz(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id,
      },
      select: {
        contributors: true,
        Owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return quiz;
  } catch (error) {
    return null;
  }
}

export default async function Footer({ params, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Zaloguj się aby dostać się na tą strone.");

  const quiz = await getQuiz(params.quizId);
  if (!quiz) notFound();
  if (
    quiz.Owner.id !== session.user?.id &&
    !quiz.contributors.includes(session.user?.id || "")
  )
    throw new Error("Nie masz dostępu do tej strony.");

  return (
    <footer className="lg:absolute lg:bottom-4 flex gap-4">
      {quiz.Owner.id === session.user?.id && (
        <Link
          className="btn px-4 btn-sm"
          href={`/quizes/${params.quizId}/edit`}
        >
          wróć
        </Link>
      )}
      <Link
        className="btn btn-sm px-4"
        href={`/quizes/${params.quizId}/ocr`}
      >
        foto
      </Link>
    </footer>
  );
}
