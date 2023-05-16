import Container from "@/components/ui/container";
import { RemovePersonIcon } from "@/lib/icons";
import { user } from "../contributors";
import H3 from "@/components/ui/headings/h3";

interface Props {
  contributors: user[];
  removeContributor: (user: user) => void;
}

export default function ContributorsList({
  contributors,
  removeContributor,
}: Props) {
  return (
    <Container className="w-full lg:w-96 h-[485px] p-4 overflow-y-auto">
      {contributors.map((contributor) => (
        <section
          className="flex justify-between"
          key={contributor.id}
        >
          <H3>{contributor.name}</H3>
          <button onClick={removeContributor.bind(null, contributor)}>
            <RemovePersonIcon className="text-3xl" />
          </button>
        </section>
      ))}
    </Container>
  );
}
