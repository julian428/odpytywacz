import Container from "@/components/ui/container";
import { AddPersonIcon } from "@/lib/icons";
import { user } from "../contributors";
import H3 from "@/components/ui/headings/h3";

interface Props {
  friends: user[];
  addContributor: (user: user) => void;
}

export default function FriendsList({ friends, addContributor }: Props) {
  return (
    <Container className="w-full lg:w-96 h-32 p-4 overflow-y-auto">
      {friends.map((friend) => (
        <section
          className="flex justify-between"
          key={friend.id}
        >
          <H3>{friend.name}</H3>
          <button onClick={addContributor.bind(null, friend)}>
            <AddPersonIcon className="text-3xl" />
          </button>
        </section>
      ))}
    </Container>
  );
}
