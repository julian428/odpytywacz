import Container from "@/components/ui/container";
import H4 from "@/components/ui/headings/h4";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { ApproveIcon, DeclineIcon } from "@/lib/icons";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

async function getRequests(uid: string) {
  try {
    const requests = await prisma.friendRequest.findMany({
      where: {
        to: uid,
      },
      select: {
        from: true,
        id: true,
      },
    });
    const sendingUsers = requests.map((request) => request.from);
    const users = await prisma.user.findMany({
      where: {
        id: { in: sendingUsers },
      },
      select: {
        id: true,
        name: true,
      },
    });
    const parsedRequests = users.map((user, i) => ({
      ...user,
      id: requests[i].id,
      sender: user.id,
    }));
    return parsedRequests;
  } catch (error) {
    return [];
  }
}

export default async function RequestList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    throw new Error("Nie jesteś zalogowany.");
  }
  const requests = await getRequests(session.user.id);

  const addFriend = async (data: FormData) => {
    "use server";

    const user = data.get("user") as string | null;
    const friend = data.get("friend") as string | null;
    const request = data.get("request") as string | null;

    if (!user) throw new Error("Nie jesteś zalogowany.");
    if (!friend) throw new Error("Nie ma takiego użytkownika.");
    if (!request) throw new Error("Taka proźba o znajomość nie istnieje.");

    try {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: user },
          data: {
            friends: { push: friend },
          },
        }),
        prisma.user.update({
          where: { id: friend },
          data: {
            friends: { push: user },
          },
        }),
        prisma.friendRequest.delete({ where: { id: request } }),
      ]);
      revalidatePath("/dashboard");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  const removeRequest = async (data: FormData) => {
    "use server";

    const id = data.get("request") as string | null;
    if (!id) throw new Error("Takie żądanie znajomości nie istnieje.");

    try {
      await prisma.friendRequest.delete({ where: { id } });
      revalidatePath("/dashboard");
    } catch (error) {
      throw new Error("Coś poszło nie tak.");
    }
  };

  return (
    <Container
      variant="solid-dark"
      className="w-full overflow-x-auto flex gap-4 py-2 h-[52px]"
    >
      {requests.length < 1 ? (
        <div className="flex justify-center items-center w-full">
          <p>Brak zaproszeń</p>
        </div>
      ) : (
        requests.map((request) => (
          <Container
            variant="solid-dark"
            opacity="full"
            key={request.id}
            className="flex gap-8 items-center"
          >
            <H4>{request.name}</H4>
            <section className="flex text-xl gap-1">
              <form
                action={addFriend}
                method="post"
              >
                <input
                  type="hidden"
                  name="user"
                  value={session.user?.id || ""}
                />
                <input
                  type="hidden"
                  name="friend"
                  value={request.sender}
                />
                <input
                  type="hidden"
                  name="request"
                  value={request.id}
                />
                <button>
                  <ApproveIcon className="text-green-700" />
                </button>
              </form>
              <form
                action={removeRequest}
                method="post"
              >
                <input
                  type="hidden"
                  name="request"
                  value={request.id}
                />
                <button>
                  <DeclineIcon className="text-red-700" />
                </button>
              </form>
            </section>
          </Container>
        ))
      )}
    </Container>
  );
}
