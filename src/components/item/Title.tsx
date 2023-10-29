interface Props {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
}

export default function Title({ state }: Props) {
  const [val, setVal] = state;
  return (
    <div className="flex text-2xl p-2 focus-within:bg-accent focus-within:bg-opacity-10 duration-300">
      <label htmlFor="title">title:</label>
      <input
        id="title"
        type="text"
        name="title"
        pattern="^(.{0,64})$"
        defaultValue={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full invalid:decoration-wavy invalid:underline invalid:decoration-error bg-transparent outline-none pl-2 italic text-xl opacity-50 tracking-wide"
      />
    </div>
  );
}
