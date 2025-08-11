import { DefaultCard } from "@/components/DefaultCard";
import { DefaultGrid } from "@/components/DefaultGrid";
import { CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { useMarketBuyerProfileRecordsStore } from "../marketBuyerProfileRecordsStore";
import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import Link from "next/link";

export const DisplayBuyersScreen = () => {
  const marketBuyerProfileRecordsStore = useMarketBuyerProfileRecordsStore();
  return (
    <MainLayout>
      <H1>Buyers</H1>
      {(() => {
        if (marketBuyerProfileRecordsStore.data === undefined) return <div>loading</div>;
        if (marketBuyerProfileRecordsStore.data === null) return <div>error</div>;
        if (marketBuyerProfileRecordsStore.data.length === 0) return <div>No buyers yet</div>;

        return (
          <DefaultGrid>
            {marketBuyerProfileRecordsStore.data.map((x) => (
              <Link href={`/chat/${x.userId}`} key={x.id}>
                <DefaultCard
                  imageUrl={pb.files.getURL(x, x.imageUrl)}
                  imageAlt=""
                  header={<CardTitle>{x.name}</CardTitle>}
                  onClick={() => {}}
                >
                  {x.name}
                </DefaultCard>
              </Link>
            ))}
          </DefaultGrid>
        );
      })()}
    </MainLayout>
  );
};
