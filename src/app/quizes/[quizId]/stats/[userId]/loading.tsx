import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H1 from "@/components/ui/headings/h1";
import H2 from "@/components/ui/headings/h2";
import H3 from "@/components/ui/headings/h3";

export default function loading() {
  return (
    <article className="pb-4">
      <section className="flex flex-col lg:gap-16 gap-8 items-center mt-12">
        <header className="flex gap-4 items-end">
          <H1>tytuł</H1>
        </header>
        <section className="lg:space-x-40 flex flex-wrap justify-center">
          <div
            className="radial-progress text-color4 animate-pulse lg:scale-100 scale-75"
            style={{ "--value": 100, "--size": "12rem" } as any}
          >
            <section className="text-white scale-90">
              <H2>?</H2>
            </section>
          </div>
          <div
            className="radial-progress text-color3 animate-pulse lg:scale-100 scale-75"
            style={
              {
                "--value": 100,
                "--size": "12rem",
              } as any
            }
          >
            <section className="text-white scale-90">
              <H2>?</H2>
            </section>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Container
              className="w-40 h-7 animate-pulse"
              variant="gradient-normal"
            />
            <H3> od ostatniego razu</H3>
          </div>
          <div className="flex gap-2">
            <Container
              className="w-40 h-7 animate-pulse"
              variant="gradient-normal"
            />
            <H3> niż ostatnio</H3>
          </div>
          <div className="flex gap-2">
            <H3>popełniłeś</H3>
            <Container
              className="w-20 h-7 animate-pulse"
              variant="gradient-normal"
            />
          </div>
          <div className="flex gap-2">
            <Container
              className="w-10 h-7 animate-pulse"
              variant="gradient-normal"
            />
            <H3>to twój</H3>
            <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
              <H3>przeciętny</H3>
            </div>
            <H3>wynik</H3>
          </div>
          <div className="flex gap-2">
            <Container
              className="w-20 h-7 animate-pulse"
              variant="gradient-normal"
            />
            <H3>to twój</H3>
            <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
              <H3>przeciętny</H3>
            </div>
            <H3>czas</H3>
          </div>
        </section>
        <section className="flex gap-32">
          <Button className="px-6">reset</Button>
          <Button
            variant="ghost"
            className="px-6 text-white"
          >
            quizy
          </Button>
        </section>
      </section>
    </article>
  );
}
