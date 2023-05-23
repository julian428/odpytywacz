import Container from "@/components/ui/container";
import { SearchIcon } from "@/lib/icons";

export default function BlogsList() {
  return (
    <Container
      className="w-full h-80 lg:h-[650px] flex flex-col items-center py-4 px-8"
      variant="solid-normal"
    >
      <form className="mb-4 relative">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="wyszukaj…"
              name="b"
              autoComplete="off"
              className="input bg-neutral focus:ring-0"
            />
            <button className="btn btn-square bg-neutral text-2xl">
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
