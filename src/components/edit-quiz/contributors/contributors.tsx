import Container from "@/components/ui/container";
import prisma from "@/lib/db";
import { Suspense } from "react";
import ContributorCard from "./contributorCard";

interface Props {
  qid: string;
}

async function getContributors(id: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: {
        contributors: true,
      },
    });
    return quiz?.contributors || [];
  } catch (error) {
    return [];
  }
}

export default async function ContributorsList({ qid }: Props) {
  const contributors = await getContributors(qid);
  return (
    <Container className="w-full lg:w-96 h-[485px] p-4 overflow-y-auto">
      {contributors.map((contributor) => (
        <Suspense
          key={contributor}
          fallback={<Container className="w-full h-9 animate-pulse mb-2" />}
        >
          {/* @ts-expect-error Async Server Component*/}
          <ContributorCard
            contributorId={contributor}
            contributors={contributors}
            qid={qid}
          />
        </Suspense>
      ))}
    </Container>
  );
}
