"use client";

import { AddIcon } from "@/lib/icons";
import { toast } from "react-hot-toast";

export default function AddBlog() {
  const createBlog = () => {
    toast.error("Dostępne w krótce.");
  };
  return (
    <button onClick={createBlog}>
      <AddIcon className="w-14 h-14 text-color1" />
    </button>
  );
}
