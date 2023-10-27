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
      <form className="border-b border-base-100">
        <nav className="w-full p-2 gap-4 flex justify-between border-b border-base-100">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a
                  href={`/dashboard/${defaultData.parentId}/config`}
                  hx-boost="true"
                >
                  <span className="pr-1">
                    <GhostFolderIcon />
                  </span>
                  {defaultData.parentTitle}
                </a>
              </li>
              <li>
                <a>
                  <span className="pr-1">
                    <GhostFolderIcon />
                  </span>
                  {defaultData.title}
                </a>
              </li>
              <li>
                <a>
                  <span className="text-error pr-1">
                    <GhostConfigFileIcon />
                  </span>
                  config.yaml
                </a>
              </li>
            </ul>
          </div>
          <div className="space-x-2">
            <button className="btn btn-sm hover:bg-error rounded-none">
              delete
            </button>
            <button className="btn btn-sm hover:bg-success hover:text-black rounded-none">
              save
            </button>
          </div>
        </nav>
        <ColorPicker state={color} />
        <Cover state={cover} />
        <Title state={title} />
        <Description state={description} />
      </form>
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
