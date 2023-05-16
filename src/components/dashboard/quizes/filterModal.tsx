import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

interface Props {
  isOpen: boolean;
  selector?: string;
  setArray:
    | Dispatch<SetStateAction<any[]>>
    | Dispatch<SetStateAction<{ [selector: string]: any }[]>>;
}

export default function FilterModal({ isOpen, selector, setArray }: Props) {
  const alfaRef = useRef<HTMLInputElement>(null);
  const alfaRevRef = useRef<HTMLInputElement>(null);
  const sortArray = (event: FormEvent) => {
    event.preventDefault();
    console.log("sorting with", selector);
    if (!selector) {
      if (alfaRef.current?.checked) {
        setArray((prevState: any[]) => prevState.sort());
      } else if (alfaRevRef.current?.checked) {
        setArray((prevState: any[]) => prevState.sort().reverse());
      }
      return;
    }

    if (alfaRef.current?.checked) {
      console.log("sorting alafabetically");
      setArray((prevState: { [selector: string]: any }[]) =>
        prevState.sort((a, b) => {
          if (a[selector] < b[selector]) return -1;
          if (b[selector] < a[selector]) return 1;
          return 0;
        })
      );
    } else if (alfaRevRef.current?.checked) {
      setArray((prevState: { [selector: string]: any }[]) =>
        prevState
          .sort((a, b) => {
            if (a[selector] < b[selector]) return -1;
            if (b[selector] < a[selector]) return 1;
            return 0;
          })
          .reverse()
      );
    } else return;
  };

  return (
    <Container
      className={`absolute ${
        !isOpen && "scale-0"
      } transition-all origin-top-right right-0 m-2 text-center px-8 py-4 space-y-2`}
      variant="solid-normal"
      opacity="full"
    >
      <H3>Sortuj</H3>
      <form
        onSubmit={sortArray}
        className="space-y-2"
      >
        <article className="flex gap-4 items-center">
          <section>
            <label htmlFor="alfabetic">A&darr;</label>
            <input
              type="radio"
              ref={alfaRef}
              name="sorting"
              id="alfabetic"
            />
          </section>
          <section>
            <label htmlFor="alfabetic-reverse">A&uarr;</label>
            <input
              type="radio"
              ref={alfaRevRef}
              name="sorting"
              id="alfabetic-reverse"
            />
          </section>
        </article>
        <Button bg="dark">sortuj</Button>
      </form>
    </Container>
  );
}
