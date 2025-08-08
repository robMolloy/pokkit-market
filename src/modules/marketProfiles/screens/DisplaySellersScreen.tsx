import { DefaultGrid } from "@/components/DefaultGrid";
import { useMarketSellerProfileRecordsStore } from "../marketSellerProfileRecordsStore";
import { DefaultCard } from "@/components/DefaultCard";
import { CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";

export const DisplaySellersScreen = () => {
  const marketSellerProfileRecordsStore = useMarketSellerProfileRecordsStore();
  return (
    <MainLayout>
      <H1>Sellers</H1>
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
    </MainLayout>
  );
};
