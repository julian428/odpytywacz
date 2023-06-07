import Link from "next/link";
import Container from "../ui/container";
import H3 from "../ui/headings/h3";
import prisma from "@/lib/db";

interface Props {
  index: number;
  page: number;
  filter: string;
}

async function getQuiz(skip: number, filter: string) {
  try {
    const quiz = await prisma.quiz.findFirst({
      skip,
      take: 1,
      where: {
        title: { contains: filter },
      },
      select: {
        id: true,
        title: true,
        topic: true,
        description: true,
        Owner: {
          select: {
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

export default async function QuizLink({ index, page, filter }: Props) {
  const quiz = await getQuiz(page * 9 + index, filter);
  if (!quiz) return;
  return (
    <Container
      variant="gradient-dark"
      className="relative p-6 space-y-4 lg:w-[30%] w-full hover:scale-[99%] duration-700"
    >
      <Link
        href={`quizes/${quiz.id}`}
        className="w-[25%]"
      >
        <aside className="flex gap-2 items-start justify-between">
          <H3>{quiz.title}</H3>
          <p className="opacity-50 text-xs">{quiz.topic}</p>
        </aside>
        <aside className="w-[80%] break-words h-24 overflow-y-auto">
          {quiz.description}
        </aside>
        <aside className="flex justify-end">
          <p className="opacity-50 text-xs">{quiz.Owner.name}</p>
        </aside>
      </Link>
    </Container>
  );
}
