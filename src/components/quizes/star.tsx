"use client";

import { HollowStarIcon, StarIcon } from "@/lib/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  uid?: string | null;
  qid: string;
  isLiked: boolean;
  likes: number;
}

export default function LikeQuiz({ uid, qid, isLiked, likes }: Props) {
  const [liked, setLiked] = useState(isLiked);
  const [dynamicLikes, setDynamicLikes] = useState(likes);
  const handleLike = async () => {
    try {
      if (!liked) setDynamicLikes((prevState) => prevState + 1);
      else setDynamicLikes((prevState) => prevState - 1);
      setLiked((prevState) => !prevState);
      await axios.patch("/api/users", { uid, qid, value: liked ? -1 : 1 });
    } catch (error) {
      if (liked) setDynamicLikes((prevState) => prevState + 1);
      else setDynamicLikes((prevState) => prevState - 1);
      setLiked((prevState) => !prevState);
      toast.error("coś poszło nie tak.");
    }
  };
  return (
    <button
      onClick={handleLike}
      className="absolute right-4 text-4xl bottom-4 transition-all flex items-center gap-2"
    >
      <p className="text-base">{dynamicLikes}</p>
      {liked ? <StarIcon /> : <HollowStarIcon />}
    </button>
  );
}
