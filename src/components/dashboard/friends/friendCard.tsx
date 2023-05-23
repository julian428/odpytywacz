import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import RemoveFriendButton from "./removeFriendButton";
import prisma from "@/lib/db";

interface Props {
  fid: string;
  uid?: string | null;
}

async function getFriend(id: string) {
  try {
    const friend = await prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true },
    });
    return friend;
  } catch (error) {
    return null;
  }
}

export default async function FriendCard({ fid, uid }: Props) {
  const friend = await getFriend(fid);
  if (!friend) return;
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
