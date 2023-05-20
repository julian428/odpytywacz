import prisma from "@/lib/db";

export async function PUT(req: Request) {
  const { quizId }: { quizId?: string } = await req.json();

  if (!quizId) return new Response("Unauthorized", { status: 401 });

  try {
    await prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        timesPlayed: { increment: 1 },
      },
    });
  } catch (error) {}
}
