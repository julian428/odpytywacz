import { PersonIcon } from "@/lib/icons";
import Container from "../../ui/container";
import H2 from "../../ui/headings/h2";
import AddFriend from "./addFriend";

export default function FriendsDashboardHeader() {
  return (
    <Container
      variant="solid-dark"
      opacity="full"
      className="w-full lg:w-[400px] h-[120px] flex items-center justify-between px-4"
    >
      <section className="flex items-center gap-2">
        <PersonIcon className="w-20 h-20" />
        <H2>znajomi</H2>
      </section>
      <AddFriend />
    </Container>
  );
}
