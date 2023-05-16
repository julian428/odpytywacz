import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";

interface Props {
  questionsCount: number;
}

export default function Questions({ questionsCount }: Props) {
  return (
    <Container
      variant="solid-light"
      opacity="full"
      className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center justify-center rounded-full"
    >
      <H2>{questionsCount}</H2>
      <p className="opacity-50">pytania</p>
    </Container>
  );
}
