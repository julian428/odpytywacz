import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H1 from "@/components/ui/headings/h1";
import H2 from "@/components/ui/headings/h2";
import Input from "@/components/ui/inputs/input";
import React from "react";

export default function loading() {
  return (
    <>
      <section className="text-center mt-16 space-y-2 animate-pulse">
        <H1>tytuł</H1>
        <section className="flex gap-2 justify-center items-center">
          <p className="opacity-80">0%</p>
          <progress
            className="progress progress-success w-56"
            value={0}
            max={100}
          />
          <p className="opacity-80">100%</p>
        </section>
      </section>
      <article className="flex lg:w-fit w-full justify-center gap-4 relative mx-auto lg:mt-16 mt-48">
        <section className="w-full">
          <Container className="lg:w-[800px] lg:h-[450px] p-4 w-full flex flex-col lg:bg-opacity-50 bg-opacity-0 justify-center items-center lg:gap-8 gap-4 relative animate-pulse">
            <H2>pytanie</H2>
            <Input className="lg:text-5xl lg:p-4 lg:w-[400px] w-4/5 border-2 border-transparent" />

            <footer className="absolute flex lg:w-full gap-4 lg:scale-100 scale-75 w-fit justify-between px-2 lg:bottom-2 -bottom-8">
              <Button
                variant="ghost"
                bg="dark"
              >
                zakończ
              </Button>
              <section className="flex gap-4">
                <Button
                  variant="ghost"
                  bg="dark"
                  className="w-9 h-9 rounded-full flex justify-center items-center text-[24px]"
                >
                  <p>?</p>
                </Button>
                <Button bg="light">sprawdź</Button>
              </section>
            </footer>
          </Container>
        </section>
      </article>
    </>
  );
}
