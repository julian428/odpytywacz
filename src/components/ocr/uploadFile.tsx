"use client";

import useOcr from "@/hooks/ocr";
import Container from "../ui/container";
import { ChangeEvent, useEffect } from "react";
import { useOcrText } from "@/providers/ocrText";

export default function UploadFile() {
  const { progress, text, setFile } = useOcr();
  const [state, Dispatch] = useOcrText();

  useEffect(() => {
    if (!text) return;
    Dispatch({ type: "set-words", payload: text });
  }, [text, Dispatch]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  return (
    <Container className="flex gap-2 p-2 items-center w-full">
      <label
        htmlFor="ocr-file"
        className="bg-gradient-to-tr px-6 rounded-2xl py-2 from-color3 to-color4 border-color4 text-black"
      >
        otwórz plik
      </label>
      <input
        type="file"
        id="ocr-file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
        className="hidden"
      />
      <div>
        <progress
          className="progress progress-success w-56"
          value={progress || 0}
          max="100"
        />
        <p>{progress || 0}%</p>
      </div>
    </Container>
  );
}
