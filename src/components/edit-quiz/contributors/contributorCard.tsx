import H3 from "@/components/ui/headings/h3";
import SubmitToast from "@/components/ui/serverSubmit";
import prisma from "@/lib/db";
import { RemovePersonIcon } from "@/lib/icons";
import { revalidatePath } from "next/cache";

interface Props {
  contributorId: string;
  contributors: string[];
  qid: string;
}

async function getContributor(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
      },
    });
    await prisma.$disconnect();
    return user?.name;
  } catch (error) {
    return null;
  }
}

export default async function ContributorCard({
  contributorId,
  qid,
  contributors,
}: Props) {
  const contributor = await getContributor(contributorId);
  if (!contributor) return;
  const newContributors = contributors.filter((userId) => {
    return userId !== contributorId;
  });

  const removeContributor = async () => {
    "use server";

    try {
      await prisma.quiz.update({
        where: { id: qid },
        data: {
          contributors: newContributors,
        },
      });
      await prisma.$disconnect();
      revalidatePath(`/quizes/${qid}/edit`);
    } catch (error) {
      throw new Error("Coś poszło nie tak. Przy usuwaniu wspólnika.");
    }
  };

  return (
    <form
      action={removeContributor}
      method="post"
      className="flex justify-between"
    >
      <H3>{contributor}</H3>
      <SubmitToast message="usunięto z wspólników">
        <RemovePersonIcon className="text-3xl text-accent" />
      </SubmitToast>
    </form>
  );
}
