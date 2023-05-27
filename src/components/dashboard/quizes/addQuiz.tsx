import SubmitToast from "@/components/ui/serverSubmit";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { AddIcon } from "@/lib/icons";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default function AddQuiz() {
  const createQuiz = async () => {
    "use server";

    const session = await getServerSession(authOptions);
    if (!session) return;
    if (!session.user) return;
    if (!session.user.id) return;

    try {
      await prisma.quiz.create({
        data: {
          ownerId: session.user.id,
        },
      });

      revalidatePath("/dashboard");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <form action={createQuiz}>
      <SubmitToast message="Dodano quiz">
        <AddIcon className="w-14 h-14 text-color2" />
      </SubmitToast>
    </form>
  );
}
