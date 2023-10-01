import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import H4 from "@/components/ui/headings/h4";
import prisma from "@/lib/db";
import { getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface Props {
  qid: string;
  question: {
    id: string;
    question: string;
    answears: string[];
    createdAt: any;
  };
}

export default function QuestionLink({ question, qid }: Props) {
  const timeAgo = getTimeAgo(new Date(question.createdAt).getTime());

  return (
    <Link
      href={`/quizes/${qid}/questions?q=${question.id}`}
      className="w-[45%] h-fit flex-grow"
    >
      <Container
        variant="gradient-normal"
        className="p-4 w-full"
      >
        <header className="sapce-y-0">
          <H3>{question.question}</H3>
          <div className="opacity-70">
            <H4>{question.answears[0]}</H4>
          </div>
        </header>
        <p className="text-right opacity-50 text-xs">{timeAgo}</p>
      </Container>
    </Link>
  );
}
