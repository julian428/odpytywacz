import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getSearchParams } from "@/lib/utils";

export async function POST(req: Request) {
  const {
    qid,
    question,
    answears,
  }: {
    qid?: string;
    question?: string;
    answears?: string[];
  } = await req.json();

  if (!qid) return new Response("Unauthorized", { status: 401 });
  if (!question) return new Response("Unvalid data", { status: 400 });

  try {
    const createdQuestion = await prisma.question.create({
      data: {
        quizId: qid,
        question,
        answears,
      },
    });

    pusherServer.trigger(`quiz-${qid}`, "new-question", createdQuestion);

    return new Response(JSON.stringify(createdQuestion));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data || !data.id) return new Response("Unauthorized", { status: 400 });

  try {
    const updatedQuestion = await prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    });

    pusherServer.trigger(
      `quiz-${data.quizId}`,
      "updated-question",
      updatedQuestion
    );

    return new Response("updated");
  } catch (error) {
    return new Response("Internal server error.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const searchParams = getSearchParams(req.url);
  if (!searchParams)
    return new Response("No question id provided", { status: 400 });
  const id = searchParams.q;
  if (!id) return new Response("No question id provided", { status: 400 });

  try {
    const deletedQuestion = await prisma.question.delete({ where: { id } });

    pusherServer.trigger(
      `quiz-${searchParams.qid}`,
      "deleted-question",
      deletedQuestion
    );

    return new Response("Deleted");
  } catch (error) {
    return new Response("Internal server error");
  }
}
