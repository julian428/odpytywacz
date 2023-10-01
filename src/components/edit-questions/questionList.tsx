import H1 from "../ui/headings/h1";
import Container from "../ui/container";
import QuestionLink from "./questionList/link";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import H4 from "../ui/headings/h4";

interface Props {
  qid: string;
}

async function getQuiz(id?: string | null) {
  if (!id) return null;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        title: true,
        Owner: {
          select: {
            name: true,
          },
        },
        Questions: {
          select: {
            id: true,
            question: true,
            answears: true,
            createdAt: true,
          },
        },
      },
    });
    return quiz;
  } catch (error) {
    return null;
  }
}

export default async function QuestionList({ qid }: Props) {
  const quiz = await getQuiz(qid);
  if (!quiz) notFound();
  return (
    <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
      <header className="lg:block hidden">
        <H1>{quiz.title}</H1>
        <p className="text-right opacity-50 text-xs">{quiz.Owner.name}</p>
      </header>
      <Container className="w-full lg:w-[1000px] h-96 max-h-full overflow-y-auto lg:h-[650px] p-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-start lg:content-start gap-4 lg:gap-[2%] lg:gap-y-5">
        {quiz.Questions.map((question) => (
          <QuestionLink
            key={question.id}
            qid={qid}
            question={question}
          />
        ))}
      </Container>
    </section>
  );
}
