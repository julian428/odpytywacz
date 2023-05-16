"use client";

import { useState } from "react";
import ContributorsList from "./contributors/contributors";
import FriendsList from "./contributors/friends";
import H3 from "../ui/headings/h3";
import Button from "../ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";

export type user = {
  id: string;
  name: string;
};

interface Props {
  qid: string;
  contributors: user[];
  friends: user[];
}

export default function Contributors({ friends, contributors, qid }: Props) {
  const uniqueFriends = friends.filter(
    (friend) =>
      !contributors.map((contributor) => contributor.id).includes(friend.id)
  );

  const [dynamicFriends, setDynamicFriends] = useState(uniqueFriends);
  const [dynamicContributors, setDynamicContributors] = useState(contributors);

  const [loading, setLoading] = useState(false);

  const addContributor = (user: user) => {
    setDynamicContributors((prevState) => [user, ...prevState]);
    setDynamicFriends((prevState) =>
      prevState.filter((friend) => friend !== user)
    );
  };
  const removeContributor = (user: user) => {
    setDynamicFriends((prevState) => [user, ...prevState]);
    setDynamicContributors((prevState) =>
      prevState.filter((contributor) => contributor !== user)
    );
  };

  const updateContributors = async () => {
    setLoading(true);
    try {
      toast.loading("nadpisywanie wspólników...");
      await axios.put("/api/quiz", {
        id: qid,
        contributors: dynamicContributors.map((contributor) => contributor.id),
      });
      toast.dismiss();
      toast.success("nadpisano.");
    } catch (error) {
      toast.dismiss();
      toast.error("Nie udało się nadpisać.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <aside className="space-y-2">
        <H3>dodaj znajomych</H3>
        <FriendsList
          friends={dynamicFriends}
          addContributor={addContributor}
        />
      </aside>
      <aside className="space-y-2 mt-8">
        <H3>wspólnicy</H3>
        <ContributorsList
          contributors={dynamicContributors}
          removeContributor={removeContributor}
        />
      </aside>
      <Button
        disabled={loading}
        onClick={updateContributors}
        className="px-4 mt-2 ml-4"
      >
        zapisz
      </Button>
    </section>
  );
}
