import prisma from "@/lib/db";

export async function POST(req: Request) {
  const {
    ownerId,
    quizId,
    candidateErrors,
    currentTime,
    currentPercentage,
  }: {
    ownerId?: string;
    quizId?: string;
    candidateErrors?: string[];
    currentTime?: number;
    currentPercentage?: number;
  } = await req.json();

  if (
    ownerId === undefined ||
    quizId === undefined ||
    currentPercentage === undefined ||
    currentTime === undefined
  )
    return new Response("Unauthorized", { status: 401 });

  try {
    await prisma.userQuizStats.create({
      data: {
        ownerId,
        quizId,
        candidateErrors,
        currentTime,
        currentPercentage,
        avgPercentage: currentPercentage,
        avgTime: currentTime,
      },
    });
    return new Response("created", { status: 201 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  const {
    ownerId,
    quizId,
    candidateErrors,
    currentTime,
    currentPercentage,
  }: {
    ownerId?: string;
    quizId?: string;
    candidateErrors?: string[];
    currentTime?: number;
    currentPercentage?: number;
  } = await req.json();

  if (
    ownerId === undefined ||
    quizId === undefined ||
    currentPercentage === undefined ||
    currentTime === undefined
  )
    return new Response("Unauthorized", { status: 401 });

  try {
    const quizStats = await prisma.userQuizStats.findFirst({
      where: {
        AND: [{ ownerId }, { quizId }],
      },
      select: {
        id: true,
        candidateErrors: true,
        avgPercentage: true,
        avgTime: true,
        currentPercentage: true,
        currentTime: true,
        mostErrors: true,
        prevPercentage: true,
        prevTime: true,
      },
    });

    if (!quizStats) return new Response("Not found", { status: 404 });

    const newMostErrors = quizStats.candidateErrors.filter((error) =>
      candidateErrors?.includes(error)
    );
    const newCandidateErrors = candidateErrors;
    const newPrevPercentage = quizStats.currentPercentage;
    const newPrevTime = quizStats.currentTime;
    const newCurrentPercentage = currentPercentage;
    const newCurrentTime = currentTime;
    const newAvgPercentage = Math.round(
      (quizStats.avgPercentage + currentPercentage) / 2
    );
    const newAvgTime = Math.round((quizStats.avgTime + currentTime) / 2);

    await prisma.userQuizStats.update({
      where: {
        id: quizStats.id,
      },
      data: {
        avgPercentage: newAvgPercentage,
        avgTime: newAvgTime,
        candidateErrors: newCandidateErrors,
        currentPercentage: newCurrentPercentage,
        currentTime: newCurrentTime,
        mostErrors: newMostErrors,
        prevPercentage: newPrevPercentage,
        prevTime: newPrevTime,
      },
    });

    return new Response("Accepted", { status: 202 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
