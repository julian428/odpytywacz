import AddFriend from "@/components/profile/add/addFriend";
import FriendsList from "@/components/profile/list/friendsList";
import Message from "@/components/profile/message";

interface Props {
  searchParams: {
    friend?: string;
    searchFriend?: string;
    page?: string;
  };
}

export default function page({ searchParams }: Props) {
  return (
    <article className="flex justify-center gap-8 mt-16">
      <AddFriend filter={searchParams.friend} />
      <FriendsList
        page={searchParams.page || "0"}
        friend={searchParams.searchFriend}
      />
      <Message />
    </article>
  );
}
