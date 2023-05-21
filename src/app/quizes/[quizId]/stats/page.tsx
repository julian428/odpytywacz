import Button from "@/components/ui/button";
import GoogleSignInButton from "@/components/ui/googleSignInButton";
import H1 from "@/components/ui/headings/h1";
import H2 from "@/components/ui/headings/h2";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    quizId: string;
  };
  searchParams: {
    p?: string;
    t?: string;
  };
}

async function getQuizTitle(qid: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: qid,
      },
      select: {
        title: true,
      },
    });
    return quiz?.title;
  } catch (error) {
    return null;
  }
}

export default async function page({ params, searchParams }: Props) {
  if (!searchParams.p || !searchParams.t)
    throw new Error("Niewystarczające dane wyników.");

  const session = await getServerSession(authOptions);

  if (session?.user?.id)
    redirect(`/quizes/${params.quizId}/stats/${session.user.id}`);

  const quizTitle = await getQuizTitle(params.quizId);
  if (!quizTitle) notFound();

  const currentMinutes = Math.floor(parseInt(searchParams.t) / 60000);
  const currentSeconds = Math.round((parseInt(searchParams.t) % 60000) / 1000);

  return (
    <article className="flex flex-col items-center justify-evenly lg:gap-32 lg:mt-32 mt-8 gap-8">
      <p className="lg:text-lg text-sm">
        <span className="bg-gradient-to-r from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <GoogleSignInButton
            isLoggedIn={false}
            loggedOut="zaloguj się"
          />
        </span>{" "}
        żeby dostawać spersonalizowane statystyki
      </p>
      <header className="flex gap-4 items-center">
        <Link href={`/quizes/${params.quizId}`}>
          <Button className="lg:px-8 lg:text-xl px-6">reset</Button>
        </Link>
        <H1>{quizTitle}</H1>
        <Link href={`/quizes`}>
          <Button
            variant="ghost"
            className="lg:px-8 lg:text-xl px-6 text-white"
          >
            quizy
          </Button>
        </Link>
      </header>
      <section className="lg:space-x-40 flex flex-wrap justify-center">
        <div
          className="radial-progress text-color4 lg:scale-100 scale-75"
          style={
            { "--value": parseInt(searchParams.p), "--size": "12rem" } as any
          }
        >
          <section className="text-white scale-90">
            <H2>{searchParams.p}%</H2>
          </section>
        </div>
        <div
          className="radial-progress text-color3 lg:scale-100 scale-75"
          style={
            {
              "--value": 100,
              "--size": "12rem",
            } as any
          }
        >
          <section className="text-white scale-90">
            <H2>{currentMinutes}min</H2>
            <p className="opacity-50 text-right">{currentSeconds}s</p>
          </section>
        </div>
      </section>
    </article>
  );
}
