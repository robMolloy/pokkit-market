import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { DisplayBuyersScreen } from "@/modules/marketProfiles/screens/DisplayBuyersScreen";
import { DisplaySellersScreen } from "@/modules/marketProfiles/screens/DisplaySellersScreen";
import { useCurrentUserStore } from "@/stores/authDataStore";

export default function Home() {
  const currentUserStore = useCurrentUserStore();
  return (
    <MainLayout>
      <H1>Welcome to pokkit Market</H1>

      {currentUserStore.data.authStatus === "loggedIn" &&
        currentUserStore.data.user.role !== "buyer" && <DisplayBuyersScreen />}

      {currentUserStore.data.authStatus === "loggedIn" &&
        currentUserStore.data.user.role !== "seller" && <DisplaySellersScreen />}
    </MainLayout>
  );
}
