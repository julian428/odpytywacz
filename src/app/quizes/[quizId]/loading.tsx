import Container from "@/components/ui/container";

export default function loading() {
  return (
    <>
      <article className="mt-8 flex flex-col items-center gap-8 px-4">
        <header className="h-16 w-96 bg-white opacity-80 animate-pulse rounded-2xl" />
        <nav>
          <div className="btn-group">
            <div className="btn btn-disabled">«</div>
            <div className="btn">pytanie 1</div>
            <div className="btn animate-pulse">»</div>
          </div>
        </nav>
        <Container className="p-8 flex flex-col items-center gap-8 lg:w-2/5 w-full">
          <div className="h-12 w-32 bgwhite opacity-80 animate-pulse rounded-2xl" />
          <div className="badge badge-error w-24 animate-pulse" />
          <input
            type="text"
            placeholder="odpowiedź..."
            disabled
            className="input text-2xl input-lg input-bordered w-full max-w-md border-2 animate-pulse"
          />
          <div className="divider" />
          <div className="divider" />
          <div className="badge animate-pulse w-24" />
          <footer className="w-full px-8 flex justify-between items-center">
            <button className="btn btn-sm btn-disabled">zakończ</button>
            <section className="flex gap-4 items-center">
              <div
                className="tooltip tooltip-primary"
                data-tip="pomoc"
              >
                <button className="btn btn-sm text-xl btn-disabled btn-outline btn-circle">
                  ?
                </button>
              </div>
              <button className="btn btn-sm btn-primary btn-disabled">
                sprawdź
              </button>
            </section>
          </footer>
        </Container>
      </article>
    </>
  );
}
