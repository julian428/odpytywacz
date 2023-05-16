import BlogsDashboardHeader from "./blogs/blogsHeader";
import BlogsList from "./blogs/blogsList";

export default function BlogDashboard() {
  return (
    <section className="space-y-8 lg:space-y-16">
      <BlogsDashboardHeader />
      <BlogsList />
    </section>
  );
}
