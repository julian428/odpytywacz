import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import Search from "@/components/ui/inputs/search";
import { HollowStarIcon } from "@/lib/icons";

export default function loading() {
  return (
    <article className="flex flex-col items-center mt-8 gap-6 lg:gap-12 lg:p-0 p-4">
      <Search />
      <section className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-8 justify-center content-start">
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
        <Container
          variant="gradient-dark"
          className="relative p-6 space-y-4 lg:w-[25%] h-[180px] w-full animate-pulse"
        />
      </section>
    </article>
  );
}
