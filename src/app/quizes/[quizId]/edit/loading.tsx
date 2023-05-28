import { SearchIcon } from "@/lib/icons";

export default function loading() {
  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <SearchIcon className="text-6xl animate-ping" />
    </div>
  );
}
