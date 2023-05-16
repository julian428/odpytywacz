"use client";

import { RemovePersonIcon } from "@/lib/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  fid?: string | null;
  uid?: string | null;
}

export default function RemoveFriendButton({ fid, uid }: Props) {
  const [removing, setRemoving] = useState(false);

  const removeFriend = async () => {
    setRemoving(true);
    try {
      toast.loading("Usuwanie znajomego");
      await axios.put("/api/friend/delete", { fid, uid });
      toast.dismiss();
      toast.success("Usunięto");
    } catch (error) {
      toast.dismiss();
      toast.error("Nie udało się usunąć");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <button
      disabled={removing}
      onClick={removeFriend}
    >
      <RemovePersonIcon className="text-4xl" />
    </button>
  );
}
