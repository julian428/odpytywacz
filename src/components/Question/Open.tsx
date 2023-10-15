export default function Open({ answears }: { answears: string }) {
  const parsedAnswears = answears.split(";");

  const checkInput = (event: any) => {
    const input = event.target as HTMLInputElement;
    if (parsedAnswears.includes(input.value)) {
      const currentPoints = parseInt(sessionStorage.getItem("points") || "0");
      sessionStorage.setItem("points", "" + (currentPoints + 1));
      input.style.borderColor = "green";
    } else {
      input.style.borderColor = "red";
    }
    input.disabled = true;
  };

  return (
    <input
      type="text"
      class="input input-bordered border-2 input-neutral w-full max-w-xs"
      onChange={checkInput}
    />
  );
}
