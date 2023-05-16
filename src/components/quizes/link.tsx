import Link from "next/link";
import Container from "../ui/container";
import H3 from "../ui/headings/h3";
import LikeQuiz from "./star";

interface Props {
  uid?: string | null;
  isLiked: boolean;
  quiz: {
    title: string;
    topic: string;
    description: string;
    id: string;
    likes: number;
  };
}

export default function QuizLink({ uid, quiz, isLiked }: Props) {
  return (
    <Container
      variant="gradient-dark"
      className="relative p-6 space-y-4 w-[25%]"
    >
      <Link
        href={`quizes/${quiz.id}`}
        className="w-[25%]"
      >
        <aside className="flex gap-2 items-end">
          <H3>{quiz.title}</H3>
          <p className="opacity-30 text-xs">{quiz.topic}</p>
        </aside>
        <aside className="w-[80%] break-words h-24 overflow-y-auto">
          {quiz.description}
        </aside>
      </Link>
      <LikeQuiz
        uid={uid}
        qid={quiz.id}
        isLiked={isLiked}
      />
    </Container>
  );
}
