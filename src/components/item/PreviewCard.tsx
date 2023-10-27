import { useItemData } from "./ConfigContext";

export default function PreviewCard() {
  const { data } = useItemData();

  const styleCard = {
    backgroundColor: (data.color || "#000000") + "80",
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-8 items-center cursor-pointer">
      <h2 className="text-2xl">Preview</h2>
      <div
        style={styleCard}
        className="relative h-40 w-80 overflow-hidden rounded-box"
      >
        {data.cover.length > 0 && (
          <img
            className="absolute opacity-25 w-full top-1/2 -translate-y-1/2 blur-sm hover:scale-105 hover:blur-none hover:opacity-100 duration-300"
            src={data.cover}
            alt="cover"
          />
        )}
        <article className="z-10 p-4">
          <div>
            <h3 className="italic font-extrabold tracking-wider text-lg mb-1">
              {data.title}
            </h3>
          </div>
          <p className="line-clamp-4 text-sm indent-4">{data.description}</p>
        </article>
      </div>
    </div>
  );
}
