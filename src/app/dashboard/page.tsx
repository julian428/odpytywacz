import BlogDashboard from "@/components/dashboard/blogs";
import QuizDashboard from "@/components/dashboard/quizes";

interface Props {
  searchParams: {
    q?: string;
    b?: string;
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  return (
    <article className="flex flex-col px-4 lg:flex-row lg:justify-center gap-16 lg:gap-8 pb-4 lg:pb-0">
      <QuizDashboard filter={searchParams.q} />
      <BlogDashboard filter={searchParams.b} />
    </article>
  );
}
