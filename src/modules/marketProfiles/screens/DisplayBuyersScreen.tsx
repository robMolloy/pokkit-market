import { DefaultCard } from "@/components/DefaultCard";
import { DefaultGrid } from "@/components/DefaultGrid";
import { CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { useMarketBuyerProfileRecordsStore } from "../marketBuyerProfileRecordsStore";

export const DisplayBuyersScreen = () => {
  const marketBuyerProfileRecordsStore = useMarketBuyerProfileRecordsStore();
  return (
    <>
      <DefaultGrid>
        {marketBuyerProfileRecordsStore.data?.map((x) => (
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
    </>
  );
};
