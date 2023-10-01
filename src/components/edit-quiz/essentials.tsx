import { Suspense } from "react";
import Description from "./essentials/description";
import Title from "./essentials/title";
import Topic from "./essentials/topic";
import TitleLoading from "./essentials/titleLoading";
import TopicLoading from "./essentials/topicLoading";
import DescriptionLoading from "./essentials/descriptionLoading";

interface Props {
  qid: string;
}

export default function Essentials({ qid }: Props) {
  return (
    <section className="space-y-8">
      <Suspense fallback={<TitleLoading />}>
        {/* @ts-expect-error Async Server Component*/}
        <Title qid={qid} />
      </Suspense>
      <Suspense fallback={<TopicLoading />}>
        {/* @ts-expect-error Async Server Component*/}
        <Topic qid={qid} />
      </Suspense>
      <Suspense fallback={<DescriptionLoading />}>
        {/* @ts-expect-error Async Server Component*/}
        <Description qid={qid} />
      </Suspense>
    </section>
  );
}
