"use client";

import Container from "@/components/ui/container";
import H4 from "@/components/ui/headings/h4";
import { ApproveIcon, DeclineIcon } from "@/lib/icons";
import { pusherClient } from "@/lib/pusher";
import { useSession } from "@/providers/session";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  requests: {
    name: string;
    owner: string;
    id: string;
  }[];
}

export default function RequestList({ requests }: Props) {
  const [dynamicRequests, setDynamicRequests] = useState(requests);
  const [loadingFriend, setLoadingFriend] = useState(false);
  const session = useSession();
  const uid = session?.user?.id;

  useEffect(() => {
    pusherClient.subscribe(`friendRequest-${uid}`);

    pusherClient.bind(
      "new-friend-request",
      (request: { id: string; name: string; owner: string }) => {
        setDynamicRequests((prevState) => [request, ...prevState]);
      }
    );

    return () => {
      pusherClient.unsubscribe(`friendRequest-${uid}`);
    };
  }, [uid]);

  const approveFriend = async (id: string) => {
    setLoadingFriend(true);
    try {
      toast.loading("Przyjmowanie.");
      await axios.put("/api/friend", { id });
      setDynamicRequests((prev) =>
        prev.filter((request) => request.owner !== id)
      );
      toast.dismiss();
      toast.success("Dodano");
    } catch (error) {
      toast.dismiss();
      toast.error("Coś poszło nie tak");
    } finally {
      setLoadingFriend(false);
    }
  };

  const declineFriend = async (id: string) => {
    setLoadingFriend(true);
    try {
      toast.loading("Usuwanie.");
      await axios.post("/api/friend/delete", { id });
      setDynamicRequests((prev) =>
        prev.filter((request) => request.owner !== id)
      );
      toast.dismiss();
      toast.success("Usunięto");
    } catch (error) {
      toast.dismiss();
      toast.error("Coś poszło nie tak");
    } finally {
      setLoadingFriend(false);
    }
  };

  return (
    <Container
      variant="solid-dark"
      className="w-full overflow-x-auto flex gap-4 py-2 h-[52px]"
    >
      {!dynamicRequests.length ? (
        <div className="flex justify-center items-center w-full">
          <p>Brak zaproszeń</p>
        </div>
      ) : (
        dynamicRequests.map((request) => (
          <Container
            variant="solid-dark"
            opacity="full"
            key={request.owner}
            className="flex gap-8 items-center"
          >
            <H4>{request.name}</H4>
            <section className="flex text-xl gap-1">
              <button
                disabled={loadingFriend}
                onClick={approveFriend.bind(null, request.owner)}
              >
                <ApproveIcon className="text-green-700" />
              </button>
              <button
                disabled={loadingFriend}
                onClick={declineFriend.bind(null, request.owner)}
              >
                <DeclineIcon className="text-red-700" />
              </button>
            </section>
          </Container>
        ))
      )}
    </Container>
  );
}
