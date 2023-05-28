import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";
import prisma from "@/lib/db";

interface Props {
  qid: string;
}

async function getLikes(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { likes: true },
    });
    await prisma.$disconnect();
    return quiz?.likes || 0;
  } catch (error) {
    return 0;
  }
}

export default async function Likes({ qid }: Props) {
  const likes = getLikes(qid);
  return (
    <Container
      variant="solid-normal"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{likes}</H2>
      <p className="opacity-50">liki</p>
    </Container>
  );
}
