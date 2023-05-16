import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getSearchParams } from "@/lib/utils";

export async function POST(req: Request) {
  const { uid }: { uid?: string | null } = await req.json();
  if (!uid) return new Response("Unauthorized", { status: 401 });
  try {
    const quiz = await prisma.quiz.create({
      data: {
        ownerId: uid,
      },
    });
    await prisma.$disconnect();

    pusherServer.trigger(`quiz-${uid}`, "new-quiz", {
      id: quiz.id,
      title: quiz.title,
      ownerId: uid,
    });

    return new Response(quiz.id);
  } catch (error) {
    return new Response("Couldn't create quiz", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data.id) return new Response("Unauthorized", { status: 401 });

  try {
    await prisma.quiz.update({
      where: {
        id: data.id,
      },
      data,
    });
    await prisma.$disconnect();
    return new Response("updated contributors", { status: 202 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const searchParams = getSearchParams(req.url);
  if (!searchParams || !searchParams.id)
    return new Response("no quiz id was given", { status: 400 });

  try {
    await prisma.quiz.delete({ where: { id: searchParams.id } });
    return new Response("deleted");
  } catch (error) {
    return new Response("Internal server error.", { status: 500 });
  }
}
