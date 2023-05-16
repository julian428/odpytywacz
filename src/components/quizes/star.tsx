"use client";

import { HollowStarIcon, StarIcon } from "@/lib/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  uid?: string | null;
  qid: string;
  isLiked: boolean;
}

export default function LikeQuiz({ uid, qid, isLiked }: Props) {
  const [liked, setLiked] = useState(isLiked);
  const handleLike = async () => {
    try {
      setLiked((prevState) => !prevState);
      await axios.patch("/api/users", { uid, qid, value: liked ? -1 : 1 });
    } catch (error) {
      setLiked((prevState) => !prevState);
      toast.error("coś poszło nie tak.");
    }
  };
  return (
    <button
      onClick={handleLike}
      className="absolute right-4 text-4xl bottom-4 transition-all"
    >
      {liked ? <StarIcon /> : <HollowStarIcon />}
    </button>
  );
}
