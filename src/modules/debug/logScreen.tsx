import { useCurrentUserStore, useUnverifiedIsLoggedInStore } from "@/stores/authDataStore";
import { useUsersStore } from "../users/usersStore";
import { useMarketBuyerProfileRecordStore } from "../marketBuyerProfiles/marketBuyerProfileRecordStore";
import { useMarketBuyerProfileRecordsStore } from "../marketBuyerProfiles/marketBuyerProfileRecordsStore";

export const LogScreen = () => {
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  const unverifiedIsLoggedInStore = useUnverifiedIsLoggedInStore();
  const marketBuyerProfileRecordStore = useMarketBuyerProfileRecordStore();
  const marketBuyerProfileRecordsStore = useMarketBuyerProfileRecordsStore();

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
          },
          undefined,
          2,
        )}
      </pre>
    </div>
  );
};
