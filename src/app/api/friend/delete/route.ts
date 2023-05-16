import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

//decline friend
export async function POST(req: Request) {
  const { id } = await req.json();
  try {
    await prisma.friendRequest.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return new Response("Deleted");
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

//delete friend
export async function PUT(req: Request) {
  const { fid, uid }: { fid?: string | null; uid?: string | null } =
    await req.json();
  if (!uid) return new Response("Unauthorized", { status: 401 });
  if (!fid) return new Response("Something went wrong.", { status: 500 });
  try {
    const userFriendList = await prisma.user.findUnique({
      where: { id: uid },
      select: { friends: true },
    });
    const friendFriendList = await prisma.user.findUnique({
      where: { id: fid },
      select: { friends: true },
    });

    const newUserFriendsList = userFriendList?.friends.filter(
      (friendId) => friendId !== fid
    );
    const newFriendFriendsList = friendFriendList?.friends.filter(
      (friendId) => friendId !== uid
    );

    const removeFromUser = prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        friends: newUserFriendsList,
      },
    });
    const removeFromFriend = prisma.user.update({
      where: {
        id: fid,
      },
      data: {
        friends: newFriendFriendsList,
      },
    });

    await prisma.$transaction([removeFromUser, removeFromFriend]);
    await prisma.$disconnect();

    pusherServer.trigger(`remove-friend-${fid}`, "remove-friend", uid);
    pusherServer.trigger(`remove-friend-${uid}`, "remove-friend", fid);

    return new Response("Removed friend successfully");
  } catch (error) {
    return new Response("Internal server error.", { status: 500 });
  }
}
