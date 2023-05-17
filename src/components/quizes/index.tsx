import QuizLink from "./link";

interface Props {
  uid?: string | null;
  likes: string[];
  quizes: {
    title: string;
    topic: string;
    description: string;
    id: string;
    likes: number;
  }[];
}

export default function QuizList({ uid, quizes, likes }: Props) {
  return (
    <section className="w-full flex flex-wrap gap-8 justify-center content-start mt-12">
      {quizes.map((quiz) => (
        <QuizLink
          key={quiz.id}
          isLiked={likes.includes(quiz.id)}
          quiz={quiz}
          uid={uid}
        />
      ))}
    </section>
  );
}
