import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import RemoveFriendButton from "./removeFriendButton";

interface Props {
  friend: {
    id: string;
    name: string;
  };
  uid?: string | null;
}

export default function FriendCard({ friend, uid }: Props) {
  return (
    <Container
      variant="solid-dark"
      opacity="full"
      className="w-full py-6 px-4 flex items-center justify-between"
    >
      <H3>{friend.name}</H3>
      <RemoveFriendButton
        fid={friend.id}
        uid={uid}
      />
    </Container>
  );
}
