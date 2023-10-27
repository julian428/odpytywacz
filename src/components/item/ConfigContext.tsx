import { createContext, useState, type ReactNode, useContext } from "react";

type Item = {
  title: string;
  description: string;
  cover: string;
  color: string;
};
interface Props {
  children: ReactNode;
  itemConfig: Item;
}

const ItemContext = createContext({
  data: { cover: "", color: "#000000", description: "", title: "" } as Item,
  update: (data: Item) => data,
});

export default function ItemConfigContext({ children, itemConfig }: Props) {
  const [config, setConfig] = useState<typeof itemConfig>(itemConfig);
  const update = (data: typeof itemConfig) => {
    setConfig(data);
    return data;
  };

  return (
    <ItemContext.Provider value={{ data: config, update }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItemData = () => useContext(ItemContext);
