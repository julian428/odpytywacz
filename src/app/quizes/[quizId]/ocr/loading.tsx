import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import Input from "@/components/ui/inputs/input";
import { PasteIcon } from "@/lib/icons";

export default function loading() {
  return (
    <>
      <article className="flex lg:flex-row flex-col gap-4 justify-evenly px-4 mt-4">
        <section className="flex flex-col justify-evenly gap-4">
          <form>
            <Container className="w-full space-y-4 p-4">
              <section className="space-y-4 text-right">
                <H3>pytanie</H3>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
              </section>
              <section className="flex flex-col gap-4">
                <H3>odpowiedzi</H3>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
                <div className="relative">
                  <Input
                    disabled={true}
                    className="w-full text-3xl text-black py-2 bg-color3 bg-opacity-100 pr-12"
                  />
                  <button
                    type="button"
                    disabled={true}
                    className="text-black text-3xl absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <PasteIcon />
                  </button>
                </div>
              </section>
              <Button disabled={true}>dodaj</Button>
            </Container>
          </form>
          <Container className="flex gap-2 p-2 items-center w-full">
            <label
              htmlFor="ocr-file"
              className="bg-gradient-to-tr animate-pulse px-6 rounded-2xl py-2 from-color3 to-color4 border-color4 text-black"
            >
              otwórz plik
            </label>
            <input
              type="file"
              id="ocr-file"
              accept=".jpg, .jpeg, .png"
              disabled={true}
              className="hidden"
            />
            <div>
              <progress
                className="progress progress-success w-56"
                value={0}
                max="100"
              />
              <p>{0}%</p>
            </div>
          </Container>
        </section>
        <Container className="lg:w-[1000px] lg:h-[700px] animate-pulse w-full h-96 flex flex-wrap content-start gap-4 p-4 overflow-y-auto" />
      </article>
    </>
  );
}
