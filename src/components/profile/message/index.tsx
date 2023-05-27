import Container from "@/components/ui/container";
import SubmitToast from "@/components/ui/serverSubmit";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default function Message() {
  const sendMessage = async (data: FormData) => {
    "use server";

    const messageType = data.get("type") as "IDEA" | "MISTAKE" | null;
    const content = data.get("content") as string | null;

    if (!content) return;

    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      throw new Error("Zaloguj się aby wysyłać wiadomości.");

    try {
      await prisma.message.create({
        data: {
          type: messageType || "IDEA",
          email: session.user.email || "not-logged-in",
          from: session.user.name || "not-logged-in",
          content: content,
        },
      });
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <section className="lg:h-[688px] flex flex-col justify-between items-center w-full gap-4 lg:pb-0 pb-2">
      <Container className="max-w-xs text-center">
        <p>
          masz pomysł na polepszenie strony albo znalazłeś jakiś błąd? Napisz do
          nas!
        </p>
      </Container>
      <form
        className="lg:h-[600px] gap-2 flex flex-col lg:w-fit w-full justify-between items-center relative"
        action={sendMessage}
        method="post"
      >
        <select
          className="select select-bordered w-full max-w-xs"
          name="type"
          required
        >
          <option
            disabled
            selected
            value="IDEA"
          >
            Wybierz typ zgłoszenia
          </option>
          <option value="IDEA">pomysł</option>
          <option value="MISTAKE">błąd</option>
        </select>
        <textarea
          name="content"
          required
          maxLength={1480}
          className="textarea textarea-bordered lg:w-[400px] w-full resize-none lg:h-[500px] h-96 pb-8"
          placeholder="treść zgłoszenia..."
        />
        <SubmitToast
          className="btn btn-accent absolute bottom-2 right-2 btn-xs"
          message="wysłano wiadomość."
        >
          wyślij
        </SubmitToast>
      </form>
    </section>
  );
}
