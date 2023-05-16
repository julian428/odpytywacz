import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H2 from "@/components/ui/headings/h2";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";
import Textarea from "@/components/ui/inputs/textarea";

export default function loading() {
  return (
    <article className="flex flex-col px-4 lg:px-0 lg:flex-row justify-center gap-16 lg:mt-12 pb-4">
      <section className="space-y-8">
        <section className="flex flex-col w-full lg:w-fit items-end gap-2">
          <label
            htmlFor="title-change"
            className="mr-4"
          >
            <H3>tytuł</H3>
          </label>
          <Input
            id="title-change"
            className="w-full lg:w-[400px] h-[80px] text-4xl animate-pulse"
          />
          <Button className="mr-4 px-4">zapisz</Button>
        </section>
        <section className="flex flex-col w-full lg:w-fit items-end gap-2">
          <label
            htmlFor="topic-change"
            className="mr-4"
          >
            <H3>temat</H3>
          </label>
          <Input
            id="topic-change"
            className="w-full lg:w-[400px] h-[80px] text-4xl animate-pulse"
          />
          <Button className="mr-4 px-4">zapisz</Button>
        </section>
        <section className="flex flex-col lg:w-fit w-full items-end gap-2">
          <label
            htmlFor="title-change"
            className="mr-4"
          >
            <H3>opis</H3>
          </label>
          <Textarea
            id="title-change"
            className="lg:w-[400px] w-full text-xl animate-pulse"
            rows={10}
          />
          <Button className="mr-4 px-4">zapisz</Button>
        </section>
      </section>
      <section className="space-y-4 lg:space-y-8">
        <aside className="flex lg:gap-6">
          <Container
            variant="solid-light"
            opacity="full"
            className="w-40 h-40 scale-75 lg:scale-100 flex flex-col items-center animate-pulse justify-center rounded-full"
          >
            <H2>?</H2>
            <p className="opacity-50">pytania</p>
          </Container>
          <Container
            variant="solid-normal"
            opacity="full"
            className="w-40 h-40 scale-75 animate-pulse lg:scale-100 flex flex-col items-center justify-center rounded-full"
          >
            <H2>?</H2>
            <p className="opacity-50">liki</p>
          </Container>
          <Container
            variant="solid-dark"
            opacity="full"
            className="w-40 h-40 scale-75 animate-pulse lg:scale-100 flex flex-col items-center justify-center rounded-full"
          >
            <H2>?</H2>
            <p className="opacity-50">rozgrywki</p>
          </Container>
        </aside>
        <aside className="flex flex-col gap-4 items-center">
          <Container
            variant="gradient-dark"
            className="bg-opacity-60 px-8 py-2"
          >
            <div>dodaj pytanie</div>
          </Container>
          <Container className="w-full p-4 h-[485px] flex flex-wrap gap-4 animate-pulse"></Container>
        </aside>
      </section>
      <section>
        <aside className="space-y-2">
          <H3>dodaj znajomych</H3>
          <Container className="w-full lg:w-96 h-32 p-4 overflow-y-auto animate-pulse"></Container>
        </aside>
        <aside className="space-y-2 mt-8">
          <H3>wspólnicy</H3>
          <Container className="w-full lg:w-96 h-[485px] p-4 overflow-y-auto animate-pulse"></Container>
        </aside>
        <Button className="px-4 mt-2 ml-4">zapisz</Button>
      </section>
    </article>
  );
}
