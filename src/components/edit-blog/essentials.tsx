import { Suspense } from "react";
import EditTitle from "./edit-title";
import EditTopic from "./edit-topic";
import EditDescription from "./edit-description";
import EditCoverPhoto from "./edit-coverPhoto";
import ChangeColor from "./change-color";

interface Props {
  blogId: string;
}

export default function BlogEditEssentials({ blogId }: Props) {
  return (
    <section className="lg:w-1/5 space-y-1 w-full">
      <Suspense
        fallback={
          <div className="flex flex-col items-end gap-1">
            <div className="self-start">tytuł</div>
            <input
              type="text"
              className="input w-full text-xl input-disabled animate-pulse"
            />
            <button
              disabled
              className="btn btn-xs btn-disabled"
            >
              zapisz
            </button>
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <EditTitle blogId={blogId} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex flex-col items-end gap-1">
            <div className="self-start">tytuł</div>
            <input
              type="text"
              className="input w-full text-xl input-disabled animate-pulse"
            />
            <button
              disabled
              className="btn btn-xs btn-disabled"
            >
              zapisz
            </button>
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <EditTopic blogId={blogId} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex flex-col items-end gap-1">
            <div className="self-start">tytuł</div>
            <input
              type="text"
              className="input w-full text-xl input-disabled animate-pulse"
            />
            <button
              disabled
              className="btn btn-xs btn-disabled"
            >
              zapisz
            </button>
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <EditCoverPhoto blogId={blogId} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex flex-col items-end gap-1">
            <div className="self-start">akcent</div>
            <input
              type="text"
              className="input w-full text-xl input-disabled animate-pulse"
            />
            <button
              disabled
              className="btn btn-xs btn-disabled"
            >
              zapisz
            </button>
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <ChangeColor blogId={blogId} />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex flex-col items-end gap-1">
            <div className="self-start">tytuł</div>
            <textarea
              className="textarea resize-none w-full textarea-disabled"
              rows={6}
            />
            <button
              disabled
              className="btn btn-xs btn-disabled"
            >
              zapisz
            </button>
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component*/}
        <EditDescription blogId={blogId} />
      </Suspense>
    </section>
  );
}
