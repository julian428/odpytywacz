import QuizList from "@/components/quizes";
import SelectPage from "@/components/quizes/pages";
import Search from "@/components/ui/inputs/search";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

async function getQuizPage(page?: string) {
  const numberPage = parseInt(page || "0");

  try {
    const quizesCouont = await prisma.quiz.count();
    const quizes = await prisma.quiz.findMany({
      take: 9,
      skip: numberPage * 9,
      select: {
        title: true,
        topic: true,
        description: true,
        id: true,
        likes: true,
      },
    });
    await prisma.$disconnect();
    return { quizes, count: quizesCouont };
  } catch (error) {
    return { quizes: [], count: 0 };
  }
}

async function getUserLikes(uid?: string | null) {
  if (!uid) return [];
  try {
    const userLikes = await prisma.user.findUnique({
      where: { id: uid },
      select: {
        likes: true,
      },
    });
    await prisma.$disconnect();
    return userLikes?.likes;
  } catch (error) {
    return [];
  }
}

interface Props {
  searchParams: {
    p?: string;
  };
}

export default async function QuizesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const userLikes = await getUserLikes(session?.user?.id);
  const { quizes: pageQuizes, count: pageQuizesCount } = await getQuizPage(
    searchParams.p
  );
  const pageSize = 9;
  return (
    <article className="flex flex-col items-center mt-8 gap-8">
      <Search />
      <QuizList
        likes={userLikes || []}
        quizes={pageQuizes}
        uid={session?.user?.id}
      />
      <SelectPage
        count={Math.ceil(pageQuizesCount / pageSize)}
        currentPage={parseInt(searchParams.p || "0")}
      />
    </article>
  );
}
