import type { Question } from "@prisma/client";
import H1 from "../ui/headings/h1";
import Container from "../ui/container";
import QuestionLink from "./questionList/link";

interface Props {
  title: string;
  owner: string;
  qid: string;
  questions: Question[];
}

export default function QuestionList({ title, owner, questions, qid }: Props) {
  return (
    <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
      <header className="lg:block hidden">
        <H1>{title}</H1>
        <p className="text-right opacity-50 text-xs">{owner}</p>
      </header>
      <Container className="w-full lg:w-[1000px] h-96 max-h-full overflow-y-auto lg:h-[650px] p-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-start lg:content-start gap-4">
        {questions.map((question) => (
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
