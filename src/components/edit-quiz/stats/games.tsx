import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getTimesPlayed(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { timesPlayed: true },
    });

    return quiz?.timesPlayed || 0;
  } catch (error) {
    return 0;
  }
}

export default async function Games({ qid }: Props) {
  const timesPlayed = await getTimesPlayed(qid);

  return (
    <Container
      variant="solid-dark"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{timesPlayed}</H2>
      <p className="opacity-50">rozgrywki</p>
    </Container>
  );
}
