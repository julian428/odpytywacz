import Link from "next/link";
import H3 from "../../ui/headings/h3";
import Container from "../../ui/container";
import { EditIcon } from "@/lib/icons";
import prisma from "@/lib/db";

interface Props {
  uid: string | null | undefined;
  qid: string;
}

async function getQuiz(uid: string, qid: string) {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: qid,
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
      },
    });
    await prisma.$disconnect();
    return quiz;
  } catch (error) {
    return null;
  }
}

export default async function QuizLink({ uid, qid }: Props) {
  if (!uid) return;
  const quiz = await getQuiz(uid, qid);
  if (!quiz) return;
  return (
    <Link
      className="w-full"
      href={`/quizes/${quiz.id}/${uid === quiz.ownerId ? "edit" : "questions"}`}
    >
      <Container
        variant="solid-light"
        opacity="full"
        className="w-full py-6 px-4 flex justify-between items-center"
      >
        <section className="w-4/5 relative">
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
