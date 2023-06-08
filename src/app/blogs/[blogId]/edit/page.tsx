import EditMarkDown from "@/components/edit-blog/edit-markdown";
import BlogEditEssentials from "@/components/edit-blog/essentials";
import axios from "axios";

interface Props {
  params: {
    blogId: string;
  };
}

export default async function page({ params }: Props) {
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
    </article>
  );
}
