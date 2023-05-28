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
    <article className="flex lg:flex-row flex-col lg:justify-center lg:gap-8 gap-16 mt-16 px-4">
      <AddFriend filter={searchParams.friend} />
      <FriendsList
        page={searchParams.page || "0"}
        friend={searchParams.searchFriend}
      />
      <Message />
    </article>
  );
}
