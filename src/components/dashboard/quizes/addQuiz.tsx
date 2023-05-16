"use client";

import { AddIcon } from "@/lib/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  uid?: string | null;
}

export default function AddQuiz({ uid }: Props) {
  const [loading, setLoading] = useState(false);

  const createQuiz = async () => {
    setLoading(true);
    try {
      toast.loading("Creating quiz");
      await axios.post("/api/quiz", { uid });
      toast.dismiss();
      toast.success("Created quiz");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={createQuiz}
      disabled={loading}
    >
      <AddIcon className="w-14 h-14 text-color2" />
    </button>
  );
}
