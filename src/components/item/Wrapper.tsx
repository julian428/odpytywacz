import ItemConfigContext from "./ConfigContext";
import ItemConfig from "./ItemConfig";
import PreviewCard from "./PreviewCard";

interface Props {
  data: {
    cover: string;
    color: string;
    title: string;
    description: string;
  };
}

export default function Wrapper({ data }: Props) {
  return (
    <ItemConfigContext itemConfig={data}>
      <ItemConfig />
      <PreviewCard />
    </ItemConfigContext>
  );
}
