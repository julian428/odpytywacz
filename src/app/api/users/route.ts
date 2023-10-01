import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { filter, uid }: { filter: string; uid?: string | null } =
    await req.json();
  try {
    const userFriends = await prisma.user.findUnique({
      where: {
        id: uid || "",
      },
      select: {
        friends: true,
      },
    });
    const sentRequests = await prisma.friendRequest.findMany({
      where: {
        from: uid || "",
      },
      select: {
        to: true,
      },
    });
    const parsedRequests = sentRequests.map((request) => request.to);
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { name: { contains: filter } },
          { id: { not: uid || "" } },
          { id: { notIn: userFriends?.friends } },
          { id: { notIn: parsedRequests } },
        ],
      },
      select: {
        id: true,
        name: true,
      },
    });

    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { uid, qid, value }: { uid?: string; qid?: string; value?: number } =
    await req.json();
  if (!uid) return new Response("Unauthorized", { status: 401 });
  if (!qid) return new Response("No quiz selected", { status: 400 });
  if (!value) return new Response("No value given", { status: 400 });
  if (value !== 1 && value !== -1)
    return new Response("bad value provided", { status: 400 });

  try {
    pusherServer.trigger(`quiz-${qid}`, "like", {
      value,
    });

    const user = await prisma.user.findUnique({
      where: { id: uid },
      select: { likes: true },
    });

    await prisma.quiz.update({
      where: { id: qid },
      data: {
        likes: { increment: value },
      },
    });

    if (!user) return new Response("Unauthorized", { status: 401 });

    if (value > 0) {
      await prisma.user.update({
        where: { id: uid },
        data: { likes: { push: qid } },
      });
    } else {
      await prisma.user.update({
        where: { id: uid },
        data: { likes: user?.likes.filter((like) => like !== qid) },
      });
    }

    return new Response("updated", { status: 202 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
