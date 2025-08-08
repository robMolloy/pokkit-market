import { useCurrentUserStore, useUnverifiedIsLoggedInStore } from "@/stores/authDataStore";
import { useUsersStore } from "../users/usersStore";
import { useMarketBuyerProfileRecordStore } from "../marketProfiles/marketBuyerProfileRecordStore";
import { useMarketBuyerProfileRecordsStore } from "../marketProfiles/marketBuyerProfileRecordsStore";
import { useMarketSellerProfileRecordStore } from "../marketProfiles/marketSellerProfileRecordStore";
import { useMarketSellerProfileRecordsStore } from "../marketProfiles/marketSellerProfileRecordsStore";

export const LogScreen = () => {
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  const unverifiedIsLoggedInStore = useUnverifiedIsLoggedInStore();
  const marketBuyerProfileRecordStore = useMarketBuyerProfileRecordStore();
  const marketBuyerProfileRecordsStore = useMarketBuyerProfileRecordsStore();
  const marketSellerProfileRecordStore = useMarketSellerProfileRecordStore();
  const marketSellerProfileRecordsStore = useMarketSellerProfileRecordsStore();

  return (
    <div>
      <pre>
        {JSON.stringify(
          {
            usersStore,
            currentUserStore,
            unverifiedIsLoggedInStore,
            marketBuyerProfileRecordStore,
            marketBuyerProfileRecordsStore,
            marketSellerProfileRecordStore,
            marketSellerProfileRecordsStore,
          },
          undefined,
          2,
        )}
      </pre>
    </div>
  );
};
