interface Props {
  data: {
    id: string;
    color: string;
    cover: string;
    title: string;
    description: string;
  };
}

export default function ItemCard({ data }: Props) {
  const styleCard = {
    backgroundColor: (data.color || "#000000") + "80",
  };

  return (
    <a
      href={`/item/${data.id}`}
      style={styleCard}
      className="relative h-40 w-80 col-span-3 m-auto overflow-hidden item"
    >
      {data.cover.length > 0 && (
        <img
          className="absolute opacity-25 w-full top-1/2 -translate-y-1/2 blur-sm hover:scale-105 hover:blur-none hover:opacity-100 duration-300"
          src={data.cover}
          alt="Couldn't fetch image"
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
    </a>
  );
}
