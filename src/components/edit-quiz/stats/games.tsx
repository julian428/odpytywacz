import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";

interface Props {
  timesPlayed: number;
}

export default function Games({ timesPlayed }: Props) {
  return (
    <Container
      variant="solid-dark"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{timesPlayed}</H2>
      <p className="opacity-50">rozgrywki</p>
    </Container>
  );
}
