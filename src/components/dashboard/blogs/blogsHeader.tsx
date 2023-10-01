import { ArticleIcon } from "@/lib/icons";
import Container from "../../ui/container";
import H2 from "../../ui/headings/h2";
import AddBlog from "./addBlog";

export default function BlogsDashboardHeader() {
  return (
    <Container
      variant="solid-normal"
      opacity="full"
      className="w-full lg:w-[400px] h-[120px] flex items-center justify-between px-4"
    >
      <section className="flex items-center gap-2">
        <ArticleIcon className="w-20 h-20" />
        <H2>blogi</H2>
      </section>
      <AddBlog />
    </Container>
  );
}
