import H3 from "@/components/ui/headings/h3";

export default function TitleLoading() {
  return (
    <section className="flex flex-col w-full lg:w-fit items-end gap-2">
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>tytuł</H3>
      </label>
      <input className="input w-full lg:w-[400px] h-[80px] text-4xl animate-pulse" />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 20 znaków</p>
        <div className="btn btn-sm mr-4">zapisz</div>
      </footer>
    </section>
  );
}
