import Link from "next/link";
import H3 from "../../ui/headings/h3";
import Container from "../../ui/container";
import { EditIcon } from "@/lib/icons";

interface Props {
  quiz: { id: string; title: string; ownerId: string };
  uid: string;
}

export default function QuizLink({ quiz, uid }: Props) {
  return (
    <Link
      className="w-full"
      href={`/quizes/${quiz.id}/${uid !== quiz.ownerId ? "questions" : "edit"}`}
    >
      <Container
        variant="solid-light"
        opacity="full"
        className="w-full py-6 px-4 flex justify-between items-center"
      >
        <section>
          <H3>{quiz.title}</H3>
          <p className="text-xs opacity-50 pl-4 absolute">
            {uid !== quiz.ownerId && "współpraca"}
          </p>
        </section>
        <EditIcon className="text-4xl" />
      </Container>
    </Link>
  );
}
