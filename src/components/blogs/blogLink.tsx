import Link from "next/link";
import Container from "../ui/container";
import prisma from "@/lib/db";
import H3 from "../ui/headings/h3";
import Image from "next/image";

interface Props {
  skip: number;
  filter?: string;
}

async function getBlog(skip: number, filter?: string) {
  try {
    const blog = await prisma.blog.findFirst({
      skip,
      take: 1,
      orderBy: { likes: "desc" },
      where: { title: { contains: filter } },
      select: {
        id: true,
        title: true,
        description: true,
        topic: true,
        coverPhoto: true,
        Owner: { select: { name: true } },
      },
    });
    return blog;
  } catch (error) {
    return null;
  }
}

export default async function BlogLink({ skip, filter }: Props) {
  const blog = await getBlog(skip, filter);
  if (!blog) return;
  const Content = (
    <Link
      className="w-full h-full flex flex-col justify-between z-20"
      href={`/blogs/${blog.id}`}
    >
      <article className="w-full">
        <div className="flex justify-between items-start">
          <H3>{blog.title}</H3>
          <p className="text-sm opacity-50">{blog.topic}</p>
        </div>
        <p>{blog.description}</p>
      </article>
      <footer className="text-right text-xs opacity-50">
        {blog.Owner.name}
      </footer>
    </Link>
  );
  return (
    <>
      {!blog.coverPhoto ? (
        <Container
          variant="solid-very-dark"
          className="lg:w-[30%] h-[160px] w-full p-6 relative text-white hover:scale-[99%] duration-700"
        >
          {Content}
        </Container>
      ) : (
        <Link
          href={`/blogs/${blog.id}`}
          className="lg:w-[30%] h-[160px] w-full p-6 relative bg-black bg-opacity-50 rounded-2xl text-white hover:scale-[99%] duration-700"
        >
          <Image
            src={blog.coverPhoto}
            alt="cover"
            className="opacity-10 rounded-2xl"
            fill
            objectFit="cover"
          />
          {Content}
        </Link>
      )}
    </>
  );
}
