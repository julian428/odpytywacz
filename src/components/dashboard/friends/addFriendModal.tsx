import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";
import { AddPersonIcon, LoadingIcon, SearchIcon } from "@/lib/icons";
import Button from "@/components/ui/button";
import axios from "axios";
import H4 from "@/components/ui/headings/h4";
import { toast } from "react-hot-toast";

interface Props {
  uid?: string | null;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

export default function AddFriendModal({ uid, setOpenState }: Props) {
  const [loading, setLoading] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [playerList, setPlayerList] = useState<{ id: string; name: string }[]>(
    []
  );
  const filterRef = useRef<HTMLInputElement>(null);

  const getUsers = async (event: FormEvent) => {
    event.preventDefault();
    if (!filterRef.current?.value) {
      setPlayerList([]);
      return;
    }
    setLoading(true);
    try {
      const { data: matchedUsers } = await axios.post("/api/users", {
        filter: filterRef.current.value,
        uid,
      });
      setPlayerList(matchedUsers);
    } catch (error) {
      setPlayerList([]);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (fid: string) => {
    setSendingRequest(true);
    try {
      toast.loading("Tworzenie zaproszenia.");
      await axios.post("/api/friend", { fid, uid });
      setPlayerList((prev) => prev.filter((player) => player.id !== fid));
      toast.dismiss();
      toast.success("Wysłano zaproszenie.");
    } catch (error) {
      toast.dismiss();
      toast.error("Coś poszło nie tak.");
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <Container className="z-10 p-8 flex flex-col gap-4 items-center text-white">
      <H3>Dodaj znajomego</H3>
      <form
        onSubmit={getUsers}
        className="relative"
      >
        <Input
          ref={filterRef}
          className="pr-10"
        />
        <button
          disabled={loading}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white h-full px-2 rounded-r-2xl bg-opacity-60"
        >
          {loading ? (
            <LoadingIcon className="animate-spin text-xl text-black" />
          ) : (
            <SearchIcon className="text-xl text-black" />
          )}
        </button>
      </form>
      <section>
        {playerList.length < 1 ? (
          <p>brak użytkowników.</p>
        ) : (
          playerList.map((player) => (
            <section
              key={player.id}
              className="flex items-center gap-8"
            >
              <H4>{player.name}</H4>
              <button
                disabled={sendingRequest}
                onClick={sendFriendRequest.bind(null, player.id)}
              >
                <AddPersonIcon />
              </button>
            </section>
          ))
        )}
      </section>
      <Button
        variant="ghost"
        sz="small"
        onClick={() => setOpenState(false)}
        className="text-white"
      >
        anuluj
      </Button>
    </Container>
  );
}
