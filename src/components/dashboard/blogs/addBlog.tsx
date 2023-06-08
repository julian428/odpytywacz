import SubmitToast from "@/components/ui/serverSubmit";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { AddIcon } from "@/lib/icons";

export default function AddBlog() {
  const createBlog = async () => {
    "use server";
    const getServerSession = (await import("next-auth")).getServerSession;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return;
    const revalidatePath = (await import("next/cache")).revalidatePath;
    try {
      await prisma.blog.create({
        data: { ownerId: session.user.id as string },
      });
    } catch (error) {}
    revalidatePath("/dashboard");
  };

  return (
    <form action={createBlog}>
      <SubmitToast message="dodano blog">
        <AddIcon className="w-14 h-14 text-color1" />
      </SubmitToast>
    </form>
  );
}
