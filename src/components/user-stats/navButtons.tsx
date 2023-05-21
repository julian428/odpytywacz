import Link from "next/link";
import Button from "../ui/button";

interface Props {
  quizId: string;
}

export default function NavButtons({ quizId }: Props) {
  return (
    <section className="flex gap-32">
      <Link href={`/quizes/${quizId}`}>
        <Button className="px-6">reset</Button>
      </Link>
      <Link href="/quizes">
        <Button
          variant="ghost"
          className="px-6 text-white"
        >
          quizy
        </Button>
      </Link>
    </section>
  );
}
