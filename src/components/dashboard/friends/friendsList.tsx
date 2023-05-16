"use client";

import Container from "../../ui/container";
import Search from "../../ui/inputs/search";
import { ChangeEvent, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import FriendCard from "./friendCard";

interface Props {
  friends: {
    name: string;
    id: string;
  }[];
  uid?: string | null;
}

export default function FriendsList({ friends, uid }: Props) {
  const [dynamicfriends, setDynamicFriends] = useState(friends);
  const [filter, setFilter] = useState("");

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  //new friend real-time update
  //remove friend real-time update
  useEffect(() => {
    pusherClient.subscribe(`friend-${uid}`);
    pusherClient.subscribe(`remove-friend-${uid}`);

    pusherClient.bind("new-friend", (friend: { id: string; name: string }) => {
      setDynamicFriends((prevState) => [friend, ...prevState]);
    });
    pusherClient.bind("remove-friend", (id: string) => {
      setDynamicFriends((prevState) =>
        prevState.filter((friend) => friend.id !== id)
      );
    });

    return () => {
      pusherClient.unsubscribe(`friend-${uid}`);
      pusherClient.unsubscribe(`remove-friend-${uid}`);
    };
  }, [uid]);

  return (
    <Container
      variant="solid-dark"
      className="w-full h-80 lg:h-[565px] flex flex-col items-center py-4 px-8"
    >
      <div className="mb-4 relative">
        <Search
          variant="solid-dark"
          filter={handleFilter}
          style={{ display: "none" }}
        />
      </div>
      <section className="max-h-full pt-6 overflow-y-auto w-full flex flex-col items-center space-y-8">
        {dynamicfriends.map((friend) => {
          if (!friend.name.toLowerCase().includes(filter.toLowerCase().trim()))
            return <></>;
          return (
            <FriendCard
              friend={friend}
              uid={uid}
              key={friend.id}
            />
          );
        })}
      </section>
    </Container>
  );
}
