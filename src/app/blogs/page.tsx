import BlogLink from "@/components/blogs/blogLink";
import BlogsSearch from "@/components/blogs/search";
import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import prisma from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  searchParams: { [index: string]: string };
}

async function getBlogs(skip: number, filter?: string) {
  try {
    const blogs = await prisma.blog.findMany({
      skip,
      take: 9,
      where: { title: { contains: filter } },
      select: {
        title: true,
        id: true,
        topic: true,
        description: true,
        coverPhoto: true,
        accent: true,
        Owner: { select: { name: true } },
      },
    });
    return blogs;
  } catch (error) {
    return null;
  }
}

export default async function page({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.p || "0");
  const blogs = await getBlogs(currentPage * 9, searchParams.f);
  if (!blogs) return;
  return (
    <article className="flex flex-col items-center lg:justify-center mt-8 gap-6 lg:gap-12 lg:p-0 p-4">
      <BlogsSearch searchParams={searchParams} />
      {/* pagination */}
      <div className="btn-group">
        <Link
          href={`/blogs?p=${currentPage - 1}&f=${searchParams.f || ""}`}
          className={`btn ${currentPage <= 0 && "btn-disabled"}`}
        >
          «
        </Link>
        <button className="btn">strona {currentPage + 1}</button>
        <Link
          href={`/blogs?p=${currentPage + 1}&f=${searchParams.f || ""}`}
          className="btn"
        >
          »
        </Link>
      </div>
      {/* blogs */}
      <section className="flex flex-col lg:flex-row lg:flex-wrap gap-[5%] gap-y-8 content-start w-4/5">
        {blogs.map((blog) => (
          <BlogLink
            key={blog.id}
            blog={blog}
          />
        ))}
      </section>
    </article>
  );
}
