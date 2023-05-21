import { KeyboardEvent, useRef } from "react";
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

  const checkAnswear = (event: KeyboardEvent) => {
    const inputValue = inputRef.current?.value;
    if (!inputValue || inputValue.length < 1) return;
    if (question.answears.includes(inputValue)) {
      inputRef.current.style.borderColor = "green";
      inputRef.current.disabled = true;
    }
  };

  return (
    <Container
      variant="gradient-dark"
      style={{ display: visible ? "flex" : "none" }}
      className="lg:w-[500px] w-full h-[250px] p-4 flex-col justify-evenly items-center"
    >
      <H2>{question.question}</H2>
      <Input
        ref={inputRef}
        onKeyUp={checkAnswear}
        variant="solid-light"
        className="w-2/3 lg:text-2xl text-base bg-opacity-100 text-black lg:py-2 border-2 border-transparent disabled:opacity-50 disabled:text-center transition-all duration-700"
      />
    </Container>
  );
}
