import Container from "../container";
import H3 from "../headings/h3";

interface Props {
  message: string;
  id: string;
  action: (data: FormData) => Promise<any>;
}

export default function ApproveModal({ action, message, id }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
      />
      <label
        htmlFor={id}
        className="modal cursor-pointer"
      >
        <label
          className="modal-box relative"
          htmlFor=""
        >
          <Container
            className="p-8 flex flex-col items-center gap-8 w-full"
            opacity="full"
          >
            <H3>{message}</H3>
            <form
              action={action}
              className="flex justify-evenly w-full"
            >
              <button
                type="submit"
                className="btn btn-outline btn-accent btn-sm w-28"
              >
                zatwierdź
              </button>
              <label
                htmlFor={id}
                className="w-28 btn btn-sm"
              >
                anuluj
              </label>
            </form>
          </Container>
        </label>
      </label>
    </>
  );
}
