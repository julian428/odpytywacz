import { Dispatch, useEffect, useState } from "react";
import Container from "../container";
import { toast } from "react-hot-toast";
import Button from "../button";
import H3 from "../headings/h3";

interface Props {
  action?: () => any;
  setVisibility: Dispatch<boolean>;
  message: string;
  visible: boolean;
}

export default function ApproveModal({
  action,
  setVisibility,
  message,
  visible,
}: Props) {
  const [performingAction, setPerformingAction] = useState(false);

  const handleAction = async () => {
    if (performingAction) return;
    if (!action) return;
    setPerformingAction(true);
    try {
      await action();
    } catch (error) {
      toast.dismiss();
      toast.error("coś poszło nie tak");
    } finally {
      setPerformingAction(false);
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";

    // Clean up the effect by restoring the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  return (
    <div
      className="fixed inset-0 px-4 text-base bg-black bg-opacity-50 justify-center items-center"
      style={{ display: `${visible ? "flex" : "none"}` }}
    >
      <Container
        className="p-8 flex flex-col items-center gap-8"
        opacity="full"
      >
        <H3>{message}</H3>
        <section className="flex justify-evenly w-full">
          <Button
            variant="ghost"
            type="button"
            onClick={handleAction}
            disabled={performingAction}
            className="text-white w-28"
          >
            zatwierdź
          </Button>
          <Button
            type="button"
            onClick={setVisibility.bind(null, false)}
            disabled={performingAction}
            className="w-28"
          >
            anuluj
          </Button>
        </section>
      </Container>
    </div>
  );
}
