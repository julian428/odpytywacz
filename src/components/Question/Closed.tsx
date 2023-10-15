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
      console.log("correct");
      label && (label.style.color = "green");
      fieldset.disabled = true;
    } else {
      console.log("wrong");
    }
  };

  return (
    <form onChange={checkAnswear}>
      {/* @ts-ignore */}
      <fieldset ref={fieldset}>
        {lineup().map((option: string) => (
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text" id={option + answears}>
                {option}
              </span>
              <input
                type="radio"
                name={answears}
                class="radio checked:bg-accent"
                value={option}
              />
            </label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}
