"use client";

import Button from "@/components/ui/button";
import H3 from "@/components/ui/headings/h3";
import Textarea from "@/components/ui/inputs/textarea";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  qid: string;
  description: string;
}

export default function Description({ qid, description }: Props) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  const updateDescription = async () => {
    setLoading(true);
    try {
      toast.loading("nadpisywanie opisu.");
      await axios.put("/api/quiz", {
        id: qid,
        description: descriptionRef.current?.value.slice(0, 128),
      });
      toast.dismiss();
      toast.success("nadpisano opis.");
    } catch (error) {
      toast.dismiss();
      toast.error("nie udało się nadpisać opisu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col lg:w-fit w-full items-end gap-2">
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>opis</H3>
      </label>
      <Textarea
        id="title-change"
        defaultValue={description}
        ref={descriptionRef}
        maxLength={128}
        className="lg:w-[400px] w-full text-xl"
        rows={10}
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 128 znaków</p>
        <Button
          onClick={updateDescription}
          disabled={loading}
          className="mr-4 px-4"
        >
          zapisz
        </Button>
      </footer>
    </section>
  );
}
