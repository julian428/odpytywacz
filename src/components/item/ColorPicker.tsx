import { ColorIcon } from "@lib/icons";

interface Props {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}

export default function ColorPicker({ state }: Props) {
  const [val, setVal] = state;
  return (
    <div className="flex items-center text-2xl p-2 gap-2 focus-within:bg-accent focus-within:bg-opacity-10 duration-300">
      <label htmlFor="color">color:</label>
      <input
        id="color"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        type="text"
        maxLength={7}
        pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        className="w-full bg-transparent outline-none italic text-xl opacity-50 tracking-wide"
      />
      <label
        style={{ color: val }}
        htmlFor="colorPicker"
        className="cursor-pointer"
      >
        <ColorIcon />
      </label>
      <input
        id="colorPicker"
        value={val}
        name="color"
        onChange={(e) => setVal(e.target.value)}
        type="color"
        className="bg-transparent w-0 scale-0 outline-none"
      />
    </div>
  );
}
