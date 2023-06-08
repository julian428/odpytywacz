import Container from "@/components/ui/container";
import H3 from "@/components/ui/headings/h3";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { EditIcon } from "@/lib/icons";
import Link from "next/link";

interface Props {
  filter?: string;
}

async function getUserBlogs(filter?: string) {
  const getServerSession = (await import("next-auth")).getServerSession;
  const session = await getServerSession(authOptions);
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        AND: [
          { ownerId: session?.user?.id || "" },
          { title: { contains: filter || "" } },
        ],
      },
      select: {
        id: true,
        title: true,
      },
    });
    return blogs;
  } catch (error) {
    return [];
  }
}

export default async function BlogsList({ filter }: Props) {
  const blogs = await getUserBlogs(filter);
  return (
    <section className="max-h-full pt-6 overflow-y-auto w-full flex flex-col items-center space-y-8">
      {blogs.map((blog) => (
        <Link
          key={"blog" + blog.id}
          className="w-full"
          href={`/blogs/${blog.id}/edit`}
        >
          <Container
            variant="solid-normal"
            opacity="full"
            className="w-full py-6 px-4 flex justify-between items-center"
          >
            <section className="w-4/5 relative">
              <H3>{blog.title}</H3>
            </section>
            <EditIcon className="text-4xl" />
          </Container>
        </Link>
      ))}
    </section>
  );
}
