import BlogDashboard from "@/components/dashboard/blogs";
import FriendsDashboard from "@/components/dashboard/friends";
import QuizDashboard from "@/components/dashboard/quizes";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

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

interface Props {
  searchParams: {
    q?: string;
    f?: string;
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return;
  }
  const requests = await getFriendRequests(session.user?.id);
  return (
    <article className="flex flex-col px-4 lg:flex-row lg:justify-center gap-16 lg:gap-8 pb-4 lg:pb-0">
      <QuizDashboard filter={searchParams.q} />
      <BlogDashboard />
      <FriendsDashboard
        filter={searchParams.f}
        requests={requests}
      />
    </article>
  );
}
