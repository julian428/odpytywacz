import { EditIcon } from "@lib/icons";
import { useState } from "react";

interface Props {
  color: string;
  cover: string;
  title: string;
  description: string;
}

export default function ItemConfig({
  color,
  cover,
  title,
  description,
}: Props) {
  const [newColor, setNewColor] = useState(color);
  const [newCover, setNewCover] = useState(cover);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <div className="overflow-x-auto w-full">
      <table className="table bg-neutral">
        <thead>
          <tr className="text-center">
            <th>
              <button className="btn btn-xs btn-success">save</button>
            </th>
            <th className="text-lg text-left">
              Edit the <b>{newTitle}</b> item
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: newColor }}>
            <th className="text-center w-fit">color</th>
            <td className="flex h-[45px] items-center" colSpan={4}>
              <input
                type="color"
                id="color"
                defaultValue={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-full bg-transparent outline-none scale-0"
              />
              <label htmlFor="color" className="text-xl cursor-pointer">
                <EditIcon />
              </label>
            </td>
          </tr>
          <tr>
            <th className="w-fit text-center">cover</th>
            <td colSpan={4}>
              <input
                style={{ borderColor: newColor }}
                type="text"
                placeholder="Type here..."
                defaultValue={newCover}
                className="w-full bg-transparent outline-none border-0 border-l-2 pl-2"
              />
            </td>
          </tr>
          <tr>
            <th className="text-center w-fit">title</th>
            <td>
              <input
                style={{ borderColor: newColor }}
                type="text"
                className="w-full bg-transparent outline-none pl-2 border-0 border-l-2"
                placeholder="Type here..."
                defaultValue={newTitle}
              />
            </td>
          </tr>
          <tr>
            <th className="text-center w-fit">description</th>
            <td>
              <textarea
                style={{ borderColor: newColor }}
                className="w-full resize-none bg-transparent outline-none border-0 border-l-2 p-2 border-b-2"
                rows={10}
                defaultValue={newDescription}
                placeholder="Type here..."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
