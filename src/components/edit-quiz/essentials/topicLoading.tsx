import H3 from "@/components/ui/headings/h3";

export default function TopicLoading() {
  return (
    <section className="flex flex-col w-full lg:w-fit items-end gap-2">
      <label
        htmlFor="topic-change"
        className="mr-4"
      >
        <H3>temat</H3>
      </label>
      <input
        id="topic-change"
        maxLength={20}
        name="topic"
        type="text"
        className="w-full lg:w-[400px] h-[80px] text-4xl input animate-pulse"
      />
      <footer className="flex w-full items-center pl-4 justify-between">
        <p>max 20 znaków</p>
        <div className="btn btn-sm mr-4">zapisz</div>
      </footer>
    </section>
  );
}
