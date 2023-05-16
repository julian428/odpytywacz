import Container from "@/components/ui/container";
import Search from "@/components/ui/inputs/search";

export default function BlogsList() {
  return (
    <Container
      className="w-full h-80 lg:h-[650px] flex flex-col items-center py-4 px-8"
      variant="solid-normal"
    >
      <div className="mb-4">
        <Search
          variant="solid-normal"
          style={{ display: "none" }}
        />
      </div>
    </Container>
  );
}
