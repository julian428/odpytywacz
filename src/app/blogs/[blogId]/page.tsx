import axios from "axios";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

interface Props {
  params: {
    blogId: string;
  };
}

export default async function page({ params }: Props) {
  const link = `https://ajalovgitxohxesrkgch.supabase.co/storage/v1/object/public/blogs/${params.blogId}.md`;
  let markdown;
  try {
    markdown = await axios(link);
  } catch (error) {
    throw new Error("Ten blog nie ma żadnej treści.");
  }

  return (
    <article className="p-8 flex justify-center">
      <div className="prose 2xl:prose-2xl xl:prose-xl lg:prose-lg sm:w-fit max-w-full">
        <Suspense>
          {/* @ts-expect-error Async Server Component*/}
          <MDXRemote source={markdown.data} />
        </Suspense>
      </div>
    </article>
  );
}
