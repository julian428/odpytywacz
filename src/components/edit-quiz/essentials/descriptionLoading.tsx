import H3 from "@/components/ui/headings/h3";

export default function DescriptionLoading() {
  return (
    <section className="flex flex-col lg:w-fit w-full items-end gap-2">
      <label
        htmlFor="title-change"
        className="mr-4"
      >
        <H3>opis</H3>
      </label>
      <textarea
        id="title-change"
        maxLength={128}
        rows={10}
        className="lg:w-[400px] w-full text-xl textarea resize-none animate-pulse"
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 128 znaków</p>
        <div className="btn btn-sm mr-4">zapisz</div>
      </footer>
    </section>
  );
}
