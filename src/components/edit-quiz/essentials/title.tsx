"use client";

import Button from "@/components/ui/button";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  qid: string;
  title: string;
}

export default function Title({ qid, title }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const updateTitle = async () => {
    setLoading(true);
    try {
      toast.loading("nadpisywanie tytułu.");
      await axios.put("/api/quiz", {
        id: qid,
        title: titleRef.current?.value.slice(0, 20),
      });
      toast.dismiss();
      toast.success("nadpisano tytuł.");
    } catch (error) {
      toast.dismiss();
      toast.error("nie udało się naspisać tytułu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full lg:w-fit items-end gap-2">
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>tytuł</H3>
      </label>
      <Input
        id="title-change"
        ref={titleRef}
        defaultValue={title}
        maxLength={20}
        className="w-full lg:w-[400px] h-[80px] text-4xl"
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 20 znaków</p>
        <Button
          onClick={updateTitle}
          disabled={loading}
          className="mr-4 px-4"
        >
          zapisz
        </Button>
      </footer>
    </section>
  );
}
