import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";

interface Props {
  likes: number;
}

export default function Likes({ likes }: Props) {
  return (
    <Container
      variant="solid-normal"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{likes}</H2>
      <p className="opacity-50">liki</p>
    </Container>
  );
}
