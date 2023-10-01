import prisma from "@/lib/db";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

interface Props {
  blogId: string;
}

export default function DeleteBlog({ blogId }: Props) {
  const deleteBlog = async (data: FormData) => {
    "use server";
    const id = data.get("id") as string | null;
    if (!id) return;
    const supabase = createClient(
      "https://ajalovgitxohxesrkgch.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWxvdmdpdHhvaHhlc3JrZ2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjYxNzYwMSwiZXhwIjoxOTk4MTkzNjAxfQ.w2Jv2NNzEmkRgDCztLlsKzP8NyBS6B8RVn-QfswWhJs"
    );

    const { data: data2, error } = await supabase.storage
      .from("blogs")
      .remove([`${id}.md`]);

    await prisma.blog.delete({ where: { id } });

    revalidatePath(`/blogs/${id}/edit`);
  };
  return (
    <form
      action={deleteBlog}
      className="lg:absolute lg:bottom-8 mb-4"
    >
      <input
        type="hidden"
        name="id"
        value={blogId}
      />
      <button className="btn btn-sm btn-error">usuń</button>
    </form>
  );
}
