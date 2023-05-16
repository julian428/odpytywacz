import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";
import { AddIcon, ArticleIcon, PersonIcon, QuizIcon } from "@/lib/icons";

export default function loading() {
  return (
    <article className="flex flex-col px-4 lg:flex-row lg:justify-center gap-16 lg:gap-8 pb-4 lg:pb-0">
      <section className="space-y-8 lg:space-y-16">
        <Container
          variant="solid-light"
          opacity="full"
          className="w-full lg:w-[400px] h-[120px] flex items-center justify-between px-4"
        >
          <section className="flex items-center gap-2">
            <QuizIcon className="w-20 h-20" />
            <H2>quizy</H2>
          </section>
          <AddIcon className="w-14 h-14 text-color2" />
        </Container>
        <Container
          variant="solid-light"
          className="w-full h-80 lg:h-[650px] py-4 px-8 animate-pulse"
        />
      </section>
      <section className="space-y-8 lg:space-y-16">
        <Container
          variant="solid-normal"
          opacity="full"
          className="w-full lg:w-[400px] h-[120px] flex items-center justify-between px-4"
        >
          <section className="flex items-center gap-2">
            <ArticleIcon className="w-20 h-20" />
            <H2>blogi</H2>
          </section>
          <AddIcon className="w-14 h-14 text-color1" />
        </Container>
        <Container
          variant="solid-normal"
          className="w-full h-80 lg:h-[650px] py-4 px-8 animate-pulse"
        />
      </section>
      <section className="space-y-8 lg:space-y-16">
        <Container
          variant="solid-dark"
          opacity="full"
          className="w-full lg:w-[400px] h-[120px] flex items-center justify-between px-4"
        >
          <section className="flex items-center gap-2">
            <PersonIcon className="w-20 h-20" />
            <H2>znajomi</H2>
          </section>
          <AddIcon className="w-14 h-14 text-color4" />
        </Container>
        <section className="h-96 lg:h-[650px] space-y-4 lg:space-y-8">
          <Container
            variant="solid-dark"
            className="w-full h-80 lg:h-[565px] py-4 px-8 animate-pulse"
          />
          <Container
            variant="solid-dark"
            className="w-full py-2 h-[52px] animate-pulse"
          />
        </section>
      </section>
    </article>
  );
}
