import Button from "@/components/ui/button";
import H1 from "@/components/ui/headings/h1";
import H2 from "@/components/ui/headings/h2";

export default function loading() {
  return (
    <article className="flex flex-col items-center justify-evenly lg:gap-32 lg:mt-32 gap-8 mt-8">
      <p className="lg:text-lg text-sm">
        <span className="bg-gradient-to-r from-color3 to-color2 text-transparent bg-clip-text font-bold">
          zaloguj się
        </span>{" "}
        żeby dostawać spersonalizowane statystyki
      </p>
      <header className="flex gap-4 items-center animate-pulse">
        <Button className="lg:px-8 lg:text-xl px-6">reset</Button>
        <H1>tytuł</H1>
        <Button
          variant="ghost"
          className="lg:px-8 lg:text-xl px-6 text-white"
        >
          quizy
        </Button>
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
          className="radial-progress text-color3 lg:scale-100 animate-pulse scale-75"
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
    </article>
  );
}
