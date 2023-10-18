import { shuffle } from "../../lib/helpers";

interface Props {
  answears: string;
  decoys: string;
  show: string;
}

export default function Closed({ answears, decoys, show }: Props) {
  let parsedAnswears = shuffle(answears.split(";"));
  let parsedDecoys = shuffle(decoys.split(";"));
  const [count, correct] = show.split(":").map((el) => parseInt(el));
  let fieldset: HTMLFieldSetElement;

  const lineup = () => {
    const resultingLineup = [];
    let c = 0;
    for (let i = 0; i < count; i++) {
      if (c < correct) {
        resultingLineup.push(parsedAnswears[parsedAnswears.length - 1]);
        parsedAnswears.pop();
        c++;
        continue;
      }
      resultingLineup.push(parsedDecoys[parsedDecoys.length - 1]);
      parsedDecoys.pop();
    }

    parsedAnswears = answears.split(";");

    return shuffle(resultingLineup);
  };

  const checkAnswear = (event: any) => {
    const input = event.target as HTMLInputElement;
    const label = document.getElementById(input.value + answears);
    if (parsedAnswears.includes(input.value)) {
      label!.style.color = "green";
      const currentPoints = parseInt(sessionStorage.getItem("points") || "0");
      sessionStorage.setItem("points", "" + (currentPoints + 1));
    } else {
      label!.style.color = "red";
    }
    fieldset.disabled = true;
  };

  return (
    <form onChange={checkAnswear}>
      {/* @ts-ignore */}
      <fieldset ref={fieldset}>
        {lineup().map((option: string, index) => (
          <div className="form-control" key={"option-" + index}>
            <label className="label cursor-pointer">
              <span className="label-text" id={"option-" + index}>
                {option}
              </span>
              <input
                type="radio"
                name={answears}
                className="radio checked:bg-accent"
                value={option}
              />
            </label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}
