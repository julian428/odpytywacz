import type { Session } from "next-auth";
import QuizDashboardHeader from "./quizes/quizHeader";
import QuizList from "./quizes/quizList";

interface Props {
  session: Session;
  quizes: { id: string; title: string; ownerId: string }[];
  uid?: string | null;
}

export default function QuizDashboard({ session, quizes, uid }: Props) {
  return (
    <section className="space-y-8 lg:space-y-16">
      <QuizDashboardHeader session={session} />
      <QuizList
        quizes={quizes}
        uid={uid}
      />
    </section>
  );
}
