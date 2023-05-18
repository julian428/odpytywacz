import QuizList from "@/components/quizes";
import SelectPage from "@/components/quizes/pages";
import QuizesSearch from "@/components/quizes/search";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

async function getQuizPage(params: { [index: string]: string }) {
  const numberPage = parseInt(params.p || "0");

  try {
    const count = await prisma.quiz.count({
      where: {
        title: { contains: params.f || "" },
      },
    });
    const quizes = await prisma.quiz.findMany({
      orderBy: { likes: "desc" },
      take: 9,
      skip: numberPage * 9,
      where: {
        title: { contains: params.f || "" },
      },
      select: {
        title: true,
        topic: true,
        description: true,
        id: true,
        likes: true,
      },
    });
    await prisma.$disconnect();
    return { quizes, count };
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
    h?: string;
  };
}

export default async function QuizesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const userLikes = await getUserLikes(session?.user?.id);
  const { quizes: pageQuizes, count: pageQuizesCount } = await getQuizPage(
    searchParams
  );
  const pageSize = 9;

  return (
    <article className="flex flex-col items-center mt-8 gap-6 lg:gap-12 lg:p-0 p-4">
      <QuizesSearch searchParams={searchParams} />
      <SelectPage
        count={Math.ceil(pageQuizesCount / pageSize)}
        currentPage={parseInt(searchParams.p || "0")}
        params={searchParams}
      />
      <QuizList
        likes={userLikes || []}
        quizes={pageQuizes}
        uid={session?.user?.id}
      />
      <section className="lg:hidden">
        <SelectPage
          count={Math.ceil(pageQuizesCount / pageSize)}
          currentPage={parseInt(searchParams.p || "0")}
          params={searchParams}
        />
      </section>
    </article>
  );
}
