import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import H4 from "@/components/ui/headings/h4";
import { EditIcon } from "@/lib/icons";
import { getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface Props {
  qid: string;
  question: {
    id: string;
    question: string;
    answears: string[];
    createdAt: Date;
  };
}

export default function QuestionLink({ qid, question }: Props) {
  const timeAgo = getTimeAgo(new Date(question.createdAt).getTime());

  return (
    <Link
      className="w-full lg:w-[32%] h-fit"
      href={`/quizes/${qid}/questions?q=${question.id}`}
    >
      <Container
        variant="gradient-normal"
        className="w-full flex justify-between items-center px-4 py-2"
      >
        <section className="w-full">
          <H3>{question.question}</H3>
          <H4>
            {question.answears[0] || "-brak pytań-"}
            {question.answears.filter((ans) => ans.length > 0).length > 1 &&
              " +" +
                question.answears.reduce((sum, answear) => {
                  if (answear) return sum + 1;
                  return sum;
                }, -1)}
          </H4>
          <p>{timeAgo}</p>
        </section>
        <EditIcon className="text-4xl" />
      </Container>
    </Link>
  );
}
