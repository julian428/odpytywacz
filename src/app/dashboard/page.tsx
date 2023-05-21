import BlogDashboard from "@/components/dashboard/blogs";
import FriendsDashboard from "@/components/dashboard/friends";
import QuizDashboard from "@/components/dashboard/quizes";
import GoogleSignInButton from "@/components/ui/googleSignInButton";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { type Session, getServerSession } from "next-auth";

async function getEditableQuizes(uid: string | null | undefined) {
  if (!uid) return [];
  try {
    const quizes = await prisma.quiz.findMany({
      where: {
        OR: [{ ownerId: uid }, { contributors: { has: uid } }],
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
      },
    });
    await prisma.$disconnect();
    return quizes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getFriends(uid: string | null | undefined) {
  if (!uid) return [];
  try {
    const friendsIds = await prisma.user.findUnique({
      where: {
        id: uid,
      },
      select: {
        friends: true,
      },
    });
    const friends = await prisma.user.findMany({
      where: {
        id: { in: friendsIds?.friends || [] },
      },
      select: {
        id: true,
        name: true,
      },
    });
    await prisma.$disconnect();
    return friends;
  } catch (error) {
    return [];
  }
}
async function getFriendRequests(uid: string | null | undefined) {
  if (!uid) return [];
  try {
    const requests = await prisma.friendRequest.findMany({
      where: {
        to: uid,
      },
      select: {
        id: true,
        from: true,
      },
    });
    const requestIds = requests.map((request) => request.from);
    const friendRequests = await prisma.user.findMany({
      where: {
        id: { in: requestIds },
      },
      select: {
        id: true,
        name: true,
      },
    });
    const parsedFriendRequest = friendRequests.map((request, index) => ({
      ...request,
      owner: requests[index].id,
    }));
    await prisma.$disconnect();
    return parsedFriendRequest;
  } catch (error) {
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return (
      <article className="flex justify-center mt-32">
        <p className="lg:text-lg">
          <span className="text-transparent bg-gradient-to-r from-color4 to-color3 bg-clip-text">
            <GoogleSignInButton
              isLoggedIn={false}
              loggedOut="zaloguj się"
            />{" "}
          </span>
          aby edytować quizy
        </p>
      </article>
    );
  }
  const editableQuizes = await getEditableQuizes(session.user?.id);
  const friends = await getFriends(session.user?.id);
  const requests = await getFriendRequests(session.user?.id);
  return (
    <article className="flex flex-col px-4 lg:flex-row lg:justify-center gap-16 lg:gap-8 pb-4 lg:pb-0">
      <QuizDashboard
        session={session}
        quizes={editableQuizes}
        uid={session.user?.id}
      />
      <BlogDashboard />
      <FriendsDashboard
        uid={session.user?.id}
        friends={friends}
        requests={requests}
      />
    </article>
  );
}
