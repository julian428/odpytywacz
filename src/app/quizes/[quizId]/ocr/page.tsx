import Footer from "@/components/ocr/footer";
import SaveQuestion from "@/components/ocr/saveQuestion";
import UploadFile from "@/components/ocr/uploadFile";
import WordsList from "@/components/ocr/wordsList";
import OcrTextProvider from "@/providers/ocrText";

interface Props {
  params: {
    quizId: string;
  };
}

export default function page({ params }: Props) {
  return (
    <OcrTextProvider>
      <article className="flex gap-4 justify-evenly">
        <section className="flex flex-col justify-evenly">
          <SaveQuestion qid={params.quizId} />
          <UploadFile />
        </section>
        <WordsList />
      </article>
      <Footer qid={params.quizId} />
    </OcrTextProvider>
  );
}
