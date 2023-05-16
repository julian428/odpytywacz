"use client";

import Button from "@/components/ui/button";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  qid: string;
  topic: string;
}

export default function Topic({ qid, topic }: Props) {
  const [loading, setLoading] = useState(false);
  const topicRef = useRef<HTMLInputElement>(null);

  const updateTopic = async () => {
    setLoading(true);
    try {
      toast.loading("nadpisywanie tematu.");
      await axios.put("/api/quiz", { id: qid, topic: topicRef.current?.value });
      toast.dismiss();
      toast.success("nadpisano temat.");
    } catch (error) {
      toast.dismiss();
      toast.error("nie udało się nadpisać tematu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full lg:w-fit items-end gap-2">
      <label
        htmlFor="topic-change"
        className="mr-4"
      >
        <H3>temat</H3>
      </label>
      <Input
        id="topic-change"
        ref={topicRef}
        defaultValue={topic}
        className="w-full lg:w-[400px] h-[80px] text-4xl"
      />
      <Button
        disabled={loading}
        onClick={updateTopic}
        className="mr-4 px-4"
      >
        zapisz
      </Button>
    </section>
  );
}
