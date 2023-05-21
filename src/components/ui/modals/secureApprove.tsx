import { Dispatch, useEffect, useRef, useState } from "react";
import Container from "../container";
import H3 from "../headings/h3";
import Input from "../inputs/input";
import Button from "../button";
import { toast } from "react-hot-toast";

interface Props {
  keyword: string;
  visibility: boolean;
  action: () => any;
  setVisibility: Dispatch<boolean>;
}

export default function SecureApprove({
  keyword,
  visibility,
  action,
  setVisibility,
}: Props) {
  const keywordRef = useRef<HTMLInputElement>(null);
  const [performingAction, setPerformingAction] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visibility ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visibility]);

  const handleClose = () => {
    if (keywordRef.current) {
      keywordRef.current.value = "";
    }
    setVisibility(false);
  };
  const handleAction = async () => {
    if (performingAction) return;
    if (!keywordRef.current?.value) return;
    if (keywordRef.current.value !== keyword) {
      toast.error("nieprawidłowe potwierdzenie.");
      return;
    }
    setPerformingAction(true);
    try {
      await action();
    } catch (error) {
      toast.dismiss();
      toast.error("coś poszło nie tak");
    } finally {
      setPerformingAction(false);
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 justify-center items-center"
      style={{ display: visibility ? "flex" : "none" }}
    >
      <Container
        opacity="full"
        className="p-8 flex flex-col items-center gap-8"
      >
        <div className="flex items-center ">
          <H3>
            potwierdź wpisując{" "}
            <span className="text-red-800 tracking-wide font-black">
              {keyword}
            </span>
          </H3>
        </div>
        <Input
          ref={keywordRef}
          className="bg-black text-red-700 text-lg w-full focus:bg-opacity-60 hover:bg-opacity-60 h-10 max-w-xs font-black"
        />
        <section className="flex justify-evenly w-full">
          <Button
            className="w-20 border-red-700 text-red-700 font-black bg-black bg-opacity-50"
            variant="ghost"
            disabled={performingAction}
            onClick={handleAction}
          >
            usuń
          </Button>
          <Button
            disabled={performingAction}
            onClick={handleClose}
            className="w-20"
          >
            anuluj
          </Button>
        </section>
      </Container>
    </div>
  );
}
