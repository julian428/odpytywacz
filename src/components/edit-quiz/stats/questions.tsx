import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getQuestionsCount(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        _count: { select: { Questions: true } },
      },
    });

    return quiz?._count.Questions || 0;
  } catch (error) {
    return 0;
  }
}

export default async function Questions({ qid }: Props) {
  const questionsCount = await getQuestionsCount(qid);

  return (
    <Container
      variant="solid-light"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{questionsCount}</H2>
      <p className="opacity-50">pytania</p>
    </Container>
  );
}
