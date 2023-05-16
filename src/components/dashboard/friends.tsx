import FriendsDashboardHeader from "./friends/friendsHeader";
import FriendsList from "./friends/friendsList";
import RequestList from "./friends/requestList";

interface Props {
  friends: {
    name: string;
    id: string;
  }[];
  requests: {
    name: string;
    owner: string;
    id: string;
  }[];
  uid?: string | null;
}

export default function FriendsDashboard({ friends, requests, uid }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <FriendsDashboardHeader uid={uid} />
      <section className="h-96 lg:h-[650px] space-y-4 lg:space-y-8">
        <FriendsList
          friends={friends}
          uid={uid}
        />
        <RequestList
          requests={requests}
          uid={uid}
        />
      </section>
    </section>
  );
}
