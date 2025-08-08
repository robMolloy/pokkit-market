import { DefaultGrid } from "@/components/DefaultGrid";
import { useMarketSellerProfileRecordsStore } from "../marketSellerProfileRecordsStore";
import { DefaultCard } from "@/components/DefaultCard";
import { CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";

export const DisplaySellersScreen = () => {
  const marketSellerProfileRecordsStore = useMarketSellerProfileRecordsStore();
  return (
    <DefaultGrid>
      {marketSellerProfileRecordsStore.data?.map((x) => (
        <DefaultCard
          key={x.id}
          imageUrl={pb.files.getURL(x, x.imageUrl)}
          imageAlt=""
          header={<CardTitle>{x.name}</CardTitle>}
          onClick={() => {}}
        >
          {x.name}
        </DefaultCard>
      ))}
    </DefaultGrid>
  );
};
