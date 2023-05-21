import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageLike, createWorker } from "tesseract.js";

interface ReturnValues {
  progress: number | null;
  text: string | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export default function useOcr(language: string = "eng"): ReturnValues {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);

  const [imgData, setImgData] = useState<string | ArrayBuffer | null>(null);

  const progressParser = (num: number) => {
    const parsedNum = Math.floor(num * 100);
    return parsedNum;
  };

  useEffect(() => {
    setImgData(null);
    setProgress(null);
    setText(null);
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImgData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    const ocr = async () => {
      if (!imgData) return;
      const worker = await createWorker({
        logger: (m) => setProgress(progressParser(m.progress)),
      });
      await worker.load();
      await worker.loadLanguage(language);
      await worker.initialize(language);
      const {
        data: { text },
      } = await worker.recognize(imgData as ImageLike);
      setText(text);
    };
    ocr();
  }, [imgData, language]);

  return { progress, text, setFile };
}
