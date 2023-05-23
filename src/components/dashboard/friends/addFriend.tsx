"use client";

import { AddIcon } from "@/lib/icons";
import { useEffect, useState } from "react";
import AddFriendModal from "./addFriendModal";
import { useSession } from "@/providers/session";

export default function AddFriend() {
  const [openModal, setOpenModal] = useState(false);
  const session = useSession();
  const uid = session?.user?.id;

  useEffect(() => {
    document.body.style.overflow = openModal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center`}
        >
          <AddFriendModal
            uid={uid}
            setOpenState={setOpenModal}
          />
        </div>
      )}
      <button onClick={() => setOpenModal((prev) => !prev)}>
        <AddIcon className="w-14 h-14 text-color4" />
      </button>
    </>
  );
}
