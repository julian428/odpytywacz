import DeleteBlog from "@/components/edit-blog/delete-blog";
import EditMarkDown from "@/components/edit-blog/edit-markdown";
import BlogEditEssentials from "@/components/edit-blog/essentials";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";

interface Props {
  params: {
    blogId: string;
  };
}

async function blogExists(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { ownerId: true },
    });
    if (!blog) return false;
    return blog.ownerId;
  } catch (error) {
    return false;
  }
}

export default async function page({ params }: Props) {
  const blogOwner = await blogExists(params.blogId);
  const session = await getServerSession(authOptions);
  if (!blogOwner || blogOwner !== session?.user?.id) {
    (await import("next/navigation")).redirect("/dashboard");
  }
  const link = `https://ajalovgitxohxesrkgch.supabase.co/storage/v1/object/public/blogs/${params.blogId}.md`;
  let data;
  try {
    data = await axios(link);
  } catch (error) {}

  return (
    <article className="flex justify-evenly flex-col lg:flex-row w-4/5 mx-auto">
      <BlogEditEssentials blogId={params.blogId} />
      <EditMarkDown
        blogId={params.blogId}
        initMarkDown={data?.data}
      />
      <DeleteBlog blogId={params.blogId} />
    </article>
  );
}
