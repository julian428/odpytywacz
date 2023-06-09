import Link from "next/link";
import Container from "../ui/container";
import prisma from "@/lib/db";
import H3 from "../ui/headings/h3";
import Image from "next/image";

interface Props {
  blog: {
    id: string;
    title: string;
    topic: string;
    description: string | null;
    coverPhoto: string | null;
    Owner: {
      name: string;
    };
  };
}

export default function BlogLink({ blog }: Props) {
  const Content = (
    <Link
      className="w-full h-full flex flex-col justify-between"
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
            className="opacity-10 z-10 rounded-2xl hover:opacity-100 duration-700 hover:bg-1/2"
            fill
            objectFit="cover"
          />
          {Content}
        </Link>
      )}
    </>
  );
}
