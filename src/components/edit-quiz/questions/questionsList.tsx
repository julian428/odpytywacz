import Container from "@/components/ui/container";
import type { Question } from "@prisma/client";
import QuestionLink from "./questionLink";

interface Props {
  qid: string;
  questions: Question[];
}

export default function QuestionsList({ qid, questions }: Props) {
  return (
    <Container className="w-full p-4 h-[485px] flex flex-wrap content-start gap-x-4 gap-y-4 justify-center">
      {questions.map((question) => (
        <QuestionLink
          key={question.id}
          qid={qid}
          question={question}
        />
      ))}
    </Container>
  );
}
