import Tooltip from "@components/Tooltip";

interface Props {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}

export default function Cover({ state }: Props) {
  const [val, setVal] = state;
  return (
    <div className="flex text-2xl p-2 focus-within:bg-accent focus-within:bg-opacity-10 duration-300">
      <label htmlFor="cover">cover:</label>
      <input
        id="cover"
        type="text"
        spellCheck={false}
        placeholder="Type url here..."
        defaultValue={val}
        onChange={(e) => setVal(e.target.value)}
        name="cover"
        className="w-full bg-transparent outline-none pl-2 italic text-xl opacity-50 tracking-wide"
      />
    </div>
  );
}
