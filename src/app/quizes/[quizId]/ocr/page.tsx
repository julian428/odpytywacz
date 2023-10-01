import Footer from "@/components/ocr/footer";
import SaveQuestion from "@/components/ocr/saveQuestion";
import UploadFile from "@/components/ocr/uploadFile";
import WordsList from "@/components/ocr/wordsList";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import OcrTextProvider from "@/providers/ocrText";
import { getServerSession } from "next-auth";

interface Props {
  params: {
    quizId: string;
  };
}

async function getQuizEdtitorsIds(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        ownerId: true,
        contributors: true,
      },
    });

    if (!quiz) return [];
    return [quiz.ownerId, ...quiz.contributors];
  } catch (error) {
    return [];
  }
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id)
    throw new Error("zaloguj się aby korzystać z tej strony");

  const editors = await getQuizEdtitorsIds(params.quizId);
  if (!editors.includes(session.user.id))
    throw new Error("Nie masz dostępu do tej strony.");

  return (
    <OcrTextProvider>
      <article className="flex lg:flex-row flex-col gap-4 justify-evenly px-4 mt-4">
        <section className="flex flex-col justify-evenly gap-4">
          <SaveQuestion qid={params.quizId} />
          <UploadFile />
        </section>
        <WordsList />
      </article>
      <Footer qid={params.quizId} />
    </OcrTextProvider>
  );
}
