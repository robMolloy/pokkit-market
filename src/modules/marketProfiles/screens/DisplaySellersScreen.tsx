import { DefaultGrid } from "@/components/DefaultGrid";
import { useMarketSellerProfileRecordsStore } from "../marketSellerProfileRecordsStore";
import { DefaultCard } from "@/components/DefaultCard";
import { CardTitle } from "@/components/ui/card";
import { pb } from "@/config/pocketbaseConfig";
import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import Link from "next/link";

export const DisplaySellersScreen = () => {
  const marketSellerProfileRecordsStore = useMarketSellerProfileRecordsStore();
  return (
    <MainLayout>
      <H1>Sellers</H1>
      <DefaultGrid>
        {(() => {
          if (marketSellerProfileRecordsStore.data === undefined) return <div>loading</div>;
          if (marketSellerProfileRecordsStore.data === null) return <div>error</div>;
          if (marketSellerProfileRecordsStore.data.length === 0) return <div>No sellers yet</div>;

          return (
            <DefaultGrid>
              {marketSellerProfileRecordsStore.data.map((x) => (
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
        {marketSellerProfileRecordsStore.data?.map((x) => (
          <Link href={`/sellers/${x.userId}`} key={x.id}>
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
    </MainLayout>
  );
};
