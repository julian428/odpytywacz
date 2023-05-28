import Container from "../container";
import H4 from "../headings/h4";
import SubmitToast from "../serverSubmit";

interface Props {
  keyword: string;
  id: string;
  action: (data: FormData) => Promise<any>;
}

export default function SecureApprove({ keyword, id, action }: Props) {
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
            opacity="full"
            className="p-4 w-full flex flex-col items-center gap-8"
          >
            <div className="flex lg:flex-row flex-col items-center lg:justify-center gap-2 w-full">
              <H4>potwierdź wpisując </H4>
              <span className="text-red-800 tracking-wide font-black text-lg">
                {keyword}
              </span>
            </div>
            <form
              className="space-y-4"
              action={action}
              method="post"
            >
              <input
                name="keyword"
                type="text"
                autoComplete="off"
                className="input bg-primary text-lg h-10 max-w-xs"
              />
              <input
                type="hidden"
                name="wanted"
                value={keyword}
              />
              <section className="flex justify-evenly w-full">
                <SubmitToast
                  className="w-20 btn btn-sm btn-error"
                  message="usunięto quiz"
                >
                  usuń
                </SubmitToast>
                <label
                  htmlFor={id}
                  className="w-20 btn btn-sm btn-outline"
                >
                  anuluj
                </label>
              </section>
            </form>
          </Container>
        </label>
      </label>
    </>
  );
}
