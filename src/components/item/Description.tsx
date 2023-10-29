interface Props {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}

export default function Description({ state }: Props) {
  const [val, setVal] = state;
  return (
    <div className="flex flex-col text-2xl p-2 focus-within:bg-accent focus-within:bg-opacity-10 duration-300">
      <label htmlFor="description">description:</label>
      <textarea
        id="description"
        defaultValue={val}
        maxLength={1024}
        name="description"
        onChange={(e) => setVal(e.target.value)}
        rows={8}
        className="w-full bg-transparent outline-none resize-none italic text-xl opacity-50 tracking-wide"
      ></textarea>
    </div>
  );
}
