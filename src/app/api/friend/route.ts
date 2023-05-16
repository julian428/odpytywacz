import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

//create friend request
export async function POST(req: Request) {
  const { fid, uid } = await req.json();
  try {
    const requestedFriend = await prisma.user.findUnique({
      where: {
        id: uid,
      },
      select: {
        name: true,
      },
    });
    const friendRequest = await prisma.friendRequest.create({
      data: {
        from: uid,
        to: fid,
      },
    });
    pusherServer.trigger(`friendRequest-${fid}`, "new-friend-request", {
      id: friendRequest.from,
      owner: friendRequest.id,
      name: requestedFriend?.name,
    });
    await prisma.$disconnect();
    return new Response("Sent");
  } catch (error) {
    return new Response("Something went wrong");
  }
}

//approve friend
export async function PUT(req: Request) {
  const { id } = await req.json();
  try {
    const deletedRequest = await prisma.friendRequest.delete({
      where: {
        id,
      },
      select: {
        from: true,
        to: true,
      },
    });
    const updateFrom = prisma.user.update({
      where: {
        id: deletedRequest.from,
      },
      data: {
        friends: { push: deletedRequest.to },
      },
      select: {
        name: true,
      },
    });
    const updateTo = prisma.user.update({
      where: {
        id: deletedRequest.to,
      },
      data: {
        friends: { push: deletedRequest.from },
      },
      select: {
        name: true,
      },
    });

    const friends = await prisma.$transaction([updateFrom, updateTo]);
    pusherServer.trigger(`friend-${deletedRequest.from}`, "new-friend", {
      id: deletedRequest.to,
      name: friends[1].name,
    });
    pusherServer.trigger(`friend-${deletedRequest.to}`, "new-friend", {
      id: deletedRequest.to,
      name: friends[0].name,
    });
    await prisma.$disconnect();
    return new Response("ok", { status: 201 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
