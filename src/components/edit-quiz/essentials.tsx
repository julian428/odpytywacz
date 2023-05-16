import Description from "./essentials/description";
import Title from "./essentials/title";
import Topic from "./essentials/topic";

interface Props {
  qid: string;
  title: string;
  topic: string;
  description: string;
}

export default function Essentials({ qid, title, topic, description }: Props) {
  return (
    <section className="space-y-8">
      <Title
        qid={qid}
        title={title}
      />
      <Topic
        qid={qid}
        topic={topic}
      />
      <Description
        qid={qid}
        description={description}
      />
    </section>
  );
}
