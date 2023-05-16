import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H1 from "@/components/ui/headings/h1";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";

export default function loading() {
  return (
    <article className="flex flex-col-reverse gap-8 lg:gap-0 lg:flex-row justify-evenly items-end p-4">
      <form className="flex flex-col items-center gap-4 text-3xl w-full lg:w-fit">
        <section className="text-right space-y-2">
          <H3>pytanie</H3>
          <Input className="w-full lg:w-[400px] h-[80px]" />
        </section>
        <section className="flex flex-col gap-2">
          <H3>odpowiedzi</H3>
          <Input className="w-full lg:w-[400px] h-[80px]" />
          <Input className="w-full lg:w-[400px] h-[80px]" />
          <Input className="w-full lg:w-[400px] h-[80px]" />
          <Input className="w-full lg:w-[400px] h-[80px]" />
          <Input className="w-full lg:w-[400px] h-[80px]" />
        </section>
        <section className="flex justify-evenly items-center w-full">
          <Button className="text-base px-8">dodaj</Button>
        </section>
      </form>
      <section className="flex flex-col items-end gap-4 w-full lg:w-fit">
        <header className="lg:block hidden animate-pulse">
          <H1>tytuł</H1>
          <p className="text-right opacity-50 text-xs">właściciel</p>
        </header>
        <Container className="w-full lg:w-[1000px] animate-pulse h-96 max-h-full overflow-y-auto lg:h-[650px] p-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center lg:content-start gap-4"></Container>
      </section>
    </article>
  );
}
