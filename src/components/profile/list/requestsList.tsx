import Container from "@/components/ui/container";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Request from "./request";
import H4 from "@/components/ui/headings/h4";

async function getRequests(uid: string) {
  try {
    const requests = await prisma.friendRequest.findMany({
      where: { to: uid },
      select: { from: true },
    });
    await prisma.$disconnect();
    return requests.map((request) => request.from);
  } catch (error) {
    return [];
  }
}

export default async function RequestsList() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("Nie jesteś zalogowany.");
  if (!session.user.id) throw new Error("Nie jesteś zalogowany.");
  const requests = await getRequests(session.user.id);
  return (
    <Container className="lg:w-[400px] w-full h-[60px] flex items-center gap-2">
      {requests.length < 1 && (
        <div className="text-black w-full text-center">
          <H4>Brak zaproszeń.</H4>
        </div>
      )}
      {requests.map((request) => (
        <Suspense
          key={request}
          fallback={
            <Container
              opacity="full"
              className="w-48 h-9 animate-pulse"
            />
          }
        >
          {/* @ts-expect-error Async Server Component*/}
          <Request
            fid={request}
            uid={session.user?.id || ""}
          />
        </Suspense>
      ))}
    </Container>
  );
}
