import { GhostConfigFileIcon, GhostFolderIcon } from "@lib/icons";
import ColorPicker from "./ColorPicker";
import { useState } from "react";
import Cover from "./Cover";
import Title from "./Title";
import Description from "./Description";
import ItemCard from "@components/ItemCard";

interface Props {
  defaultData: {
    id: string;
    color: string;
    cover: string;
    title: string;
    description: string;
    parentId: string;
    parentTitle: string;
  };
}

export default function Wrapper({ defaultData }: Props) {
  const color = useState(defaultData.color);
  const cover = useState(defaultData.cover);
  const title = useState(defaultData.title);
  const description = useState(defaultData.description);

  return (
    <>
      <div className="border-b border-base-100">
        <ColorPicker state={color} />
        <Cover state={cover} />
        <Title state={title} />
        <Description state={description} />
      </div>
      <div className="p-2">
        <h2 className="text-2xl">Preview:</h2>
        <div className="flex justify-center items-center h-full">
          <ItemCard
            data={{
              color: color[0],
              id: defaultData.id,
              description: description[0],
              title: title[0],
              cover: cover[0],
            }}
          />
        </div>
      </div>
    </>
  );
}
