"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import H3 from "../ui/headings/h3";
import SubmitToast from "../ui/serverSubmit";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

interface Props {
  blogId: string;
  initMarkDown: string;
}

export default function EditMarkDown({ blogId, initMarkDown }: Props) {
  const [markdown, setMarkdown] = useState(initMarkDown);

  const saveFile = async (event: FormEvent) => {
    event.preventDefault();
    const supabase = createClient(
      "https://ajalovgitxohxesrkgch.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWxvdmdpdHhvaHhlc3JrZ2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjYxNzYwMSwiZXhwIjoxOTk4MTkzNjAxfQ.w2Jv2NNzEmkRgDCztLlsKzP8NyBS6B8RVn-QfswWhJs"
    );

    const { data, error } = await supabase.storage
      .from("blogs")
      .update(`${blogId}.md`, markdown);

    if (!error) return;
    const { data: data2, error: error2 } = await supabase.storage
      .from("blogs")
      .upload(`${blogId}.md`, markdown);

    if (error2) toast.error("coś poszło nie tak");
  };

  return (
    <section className="lg:w-4/6 w-full flex lg:flex-row flex-col gap-4 pb-4">
      <form
        onSubmit={saveFile}
        className="lg:w-1/2 w-full relative"
      >
        <H3>Treść</H3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-[600px] textarea resize-none"
        />
        <SubmitToast
          className="btn btn-xs absolute -bottom-6 right-4"
          message="zapisano"
        >
          zapisz
        </SubmitToast>
      </form>
      <aside className="lg:w-1/2 w-full">
        <H3>Podgląd</H3>
        <div className="w-full h-[600px] textarea prose overflow-y-auto">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </aside>
    </section>
  );
}
