import Link from "next/link";
import Container from "../ui/container";
import H3 from "../ui/headings/h3";

interface Props {
  quiz: {
    id: string;
    Owner: {
      name: string;
    };
    topic: string;
    title: string;
    description: string;
  };
}

export default function QuizLink({ quiz }: Props) {
  return (
    <Container
      variant="gradient-dark"
      className="relative p-6 space-y-4 lg:w-[30%] h-[180px] w-full hover:scale-[99%] duration-700"
    >
      <Link
        href={`quizes/${quiz.id}`}
        title={quiz.title}
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
