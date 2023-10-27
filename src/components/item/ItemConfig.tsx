import { EditIcon } from "@lib/icons";
import { useItemData } from "./ConfigContext";

export default function ItemConfig() {
  const { data, update } = useItemData();

  return (
    <div className="overflow-x-auto w-full">
      <table className="table bg-neutral rounded-none">
        <tbody>
          <tr style={{ backgroundColor: data.color }}>
            <th className="text-center w-fit">color</th>
            <td className="flex h-[45px] items-center" colSpan={4}>
              <input
                type="color"
                id="color"
                defaultValue={data.color}
                onChange={(e) => update({ ...data, color: e.target.value })}
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
                style={{ borderColor: data.color }}
                type="text"
                placeholder="Type url here..."
                defaultValue={data.cover}
                onChange={(e) => update({ ...data, cover: e.target.value })}
                className="w-full bg-transparent outline-none border-0 border-l-2 pl-2"
              />
            </td>
          </tr>
          <tr>
            <th className="text-center w-fit">title</th>
            <td>
              <input
                style={{ borderColor: data.color }}
                type="text"
                className="w-full bg-transparent outline-none pl-2 border-0 border-l-2"
                placeholder="Type here..."
                defaultValue={data.title}
                onChange={(e) => update({ ...data, title: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <th className="text-center w-fit">description</th>
            <td>
              <textarea
                style={{ borderColor: data.color }}
                className="w-full resize-none bg-transparent outline-none border-0 border-l-2 p-2 border-b-2"
                rows={10}
                defaultValue={data.description}
                placeholder="Type here..."
                onChange={(e) =>
                  update({ ...data, description: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
