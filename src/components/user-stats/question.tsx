import { KeyboardEvent, useRef, useState } from "react";
import Container from "../ui/container";
import H2 from "../ui/headings/h2";
import Input from "../ui/inputs/input";

interface Props {
  visible: boolean;
  question: {
    id: string;
    answears: string[];
    question: string;
  };
}

export default function Question({ visible, question }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAnswear, setShowAnswear] = useState(false);

  const checkAnswear = (event: KeyboardEvent) => {
    const inputValue = inputRef.current?.value;
    if (!inputValue || inputValue.length < 1) return;
    if (question.answears.includes(inputValue)) {
      inputRef.current.style.borderColor = "green";
      inputRef.current.disabled = true;
    } else if (
      inputValue.length >=
      question.answears.reduce(
        (max, current) => Math.max(max, current.length),
        0
      )
    ) {
      inputRef.current.style.borderColor = "red";
      inputRef.current.disabled = true;
      setShowAnswear(true);
    }
  };

  return (
    <Container
      variant="gradient-dark"
      style={{ display: visible ? "flex" : "none" }}
      className="lg:w-[500px] w-full h-[250px] p-4 flex-col justify-evenly items-center"
    >
      <H2>{question.question}</H2>
      <Container
        variant="solid-dark"
        opacity="full"
        className={`${
          !showAnswear ? "scale-0" : "scale-100"
        } flex origin-top duration-700`}
      >
        {question.answears.map((answear, index) => (
          <p key={answear + index}>{answear}</p>
        ))}
      </Container>
      <Input
        ref={inputRef}
        onKeyUp={checkAnswear}
        variant="solid-light"
        className="w-2/3 lg:text-2xl text-base bg-opacity-100 text-black lg:py-2 border-2 border-transparent disabled:opacity-50 disabled:text-center transition-all duration-700"
      />
    </Container>
  );
}
