import prisma from "@/lib/db";
import Container from "../ui/container";
import H2 from "../ui/headings/h2";
import CardInput from "./input";
import CardFooter from "./cardFooter";
import QuestionProvider from "@/providers/question";
import CardAnswear from "./answear";

async function getQuestion(id: string) {
  try {
    const question = await prisma.question.findUnique({
      where: { id },
      select: {
        id: true,
        question: true,
        answears: true,
      },
    });
    return question;
  } catch (error) {
    return null;
  }
}

export default async function Card({
  id,
  questions,
}: {
  id: string;
  questions: string[];
}) {
  const question = await getQuestion(id);
  if (!question) {
    throw new Error("Ten quiz nie ma żadnych pytań.");
  }
  return (
    <Container className="p-8 flex flex-col items-center gap-8 lg:w-2/5 w-full">
      <H2>{question.question}</H2>
      <QuestionProvider
        key={"provider" + question.id}
        questionId={question.id}
      >
        <CardAnswear
          key={question.id}
          answears={question.answears}
        />
        <CardInput
          key={"question" + question.id}
          quizLength={questions.length}
          serverQuestion={question}
        />
        <div className="divider" />
        <CardFooter
          key={"footer" + question.id}
          question={question}
          questions={questions}
        />
      </QuestionProvider>
    </Container>
  );
}
