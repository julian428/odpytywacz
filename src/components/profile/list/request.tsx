import Container from "@/components/ui/container";
import H4 from "@/components/ui/headings/h4";
import prisma from "@/lib/db";
import { ApproveIcon, DeclineIcon } from "@/lib/icons";
import { revalidatePath } from "next/cache";

interface Props {
  uid: string;
  fid: string;
}

async function getRequestUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true },
    });

    return user?.name;
  } catch (error) {
    return null;
  }
}

export default async function Request({ uid, fid }: Props) {
  if (!uid) return;
  const requester = await getRequestUser(fid);
  if (!requester) return;

  const approveRequest = async (data: FormData) => {
    "use server";

    const user = data.get("user") as string | null;
    const friend = data.get("requester") as string | null;

    if (!user) throw new Error("Nie jesteś zalogowany.");
    if (!friend) throw new Error("Taki użytkownik nie istnieje.");

    try {
      await prisma.$transaction([
        prisma.friendRequest.deleteMany({
          where: {
            OR: [
              { AND: [{ from: friend }, { to: user }] },
              { AND: [{ from: user }, { to: friend }] },
            ],
          },
        }),
        prisma.user.update({
          where: { id: user },
          data: { friends: { push: friend } },
        }),
        prisma.user.update({
          where: { id: friend },
          data: { friends: { push: user } },
        }),
      ]);

      revalidatePath("/profile");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };
  const declineRequest = async (data: FormData) => {
    "use server";

    const user = data.get("user") as string | null;
    const friend = data.get("requester") as string | null;

    if (!user) throw new Error("Nie jesteś zalogowany.");
    if (!friend) throw new Error("Taki użytkownik nie istnieje.");

    try {
      await prisma.friendRequest.deleteMany({
        where: {
          OR: [
            { AND: [{ from: friend }, { to: user }] },
            { AND: [{ from: user }, { to: friend }] },
          ],
        },
      });

      revalidatePath("/profile");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <Container
      opacity="full"
      className="flex gap-4 items-center px-2"
    >
      <H4>{requester}</H4>
      <section className="flex gap-1 items-center">
        <form
          className="flex items-center"
          action={approveRequest}
          method="post"
        >
          <input
            type="hidden"
            value={uid}
            name="user"
          />
          <input
            type="hidden"
            value={fid}
            name="requester"
          />
          <button className="text-xl text-success">
            <ApproveIcon />
          </button>
        </form>
        <form
          className="flex items-center"
          action={declineRequest}
          method="post"
        >
          <input
            type="hidden"
            value={uid}
            name="user"
          />
          <input
            type="hidden"
            value={fid}
            name="requester"
          />
          <button className="text-xl text-error">
            <DeclineIcon />
          </button>
        </form>
      </section>
    </Container>
  );
}
