import { Layout } from "@/components/layout/Layout";
import { pb } from "@/config/pocketbaseConfig";
import { AuthForm } from "@/modules/auth/AuthForm";
import {
  smartSubscribeToMarketBuyerProfileRecord,
  smartSubscribeToMarketBuyerProfileRecords,
} from "@/modules/marketProfiles/dbMarketBuyerProfileRecordUtils";
import {
  smartSubscribeToMarketSellerProfileRecord,
  smartSubscribeToMarketSellerProfileRecords,
} from "@/modules/marketProfiles/dbMarketSellerProfileRecordUtils";
import { useMarketBuyerProfileRecordsStore } from "@/modules/marketProfiles/marketBuyerProfileRecordsStore";
import { useMarketBuyerProfileRecordStore } from "@/modules/marketProfiles/marketBuyerProfileRecordStore";
import { useMarketSellerProfileRecordsStore } from "@/modules/marketProfiles/marketSellerProfileRecordsStore";
import { useMarketSellerProfileRecordStore } from "@/modules/marketProfiles/marketSellerProfileRecordStore";
import { BuyerOnboardingScreen } from "@/modules/marketProfiles/screens/BuyerOnboardingScreen";
import { SellerOnboardingScreen } from "@/modules/marketProfiles/screens/SellerOnboardingScreen";
import { smartSubscribeToMessengerMessageRecords } from "@/modules/messengerMessages/dbMessengerMessagesUtils";
import { useMessengerMessageRecordsStore } from "@/modules/messengerMessages/messengerMessagesStore";
import { smartSubscribeToUsers, subscribeToUser, TUser } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";
import { AwaitingApprovalScreen } from "@/screens/AwaitingApprovalScreen";
import { BlockedScreen } from "@/screens/BlockedScreen";
import { LoadingScreen } from "@/screens/LoadingScreen";
import {
  useCurrentUserStore,
  useUnverifiedIsLoggedInStore,
  useUnverifiedIsLoggedInSync,
} from "@/stores/authDataStore";
import { useThemeStore } from "@/stores/themeStore";
import "@/styles/globals.css";
import "@/styles/markdown.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { Toaster } from "sonner";

const useAuth = (p: {
  onIsLoading: () => void;
  onIsLoggedIn: (p: { user: TUser }) => void;
  onIsLoggedOut: () => void;
}) => {
  const unverifiedIsLoggedInStore = useUnverifiedIsLoggedInStore();

  const currentUserStore = useCurrentUserStore();

  useUnverifiedIsLoggedInSync({ pb });

  useEffect(() => {
    // use anfn as return value is not cleanup
    (() => {
      if (unverifiedIsLoggedInStore.data.authStatus === "loggedOut")
        return currentUserStore.setData({ authStatus: "loggedOut" });

      if (unverifiedIsLoggedInStore.data.authStatus === "loading")
        return currentUserStore.setData({ authStatus: "loading" });

      if (unverifiedIsLoggedInStore.data.authStatus !== "loggedIn")
        return console.error("should never be hit");

      return subscribeToUser({
        pb,
        id: unverifiedIsLoggedInStore.data.user.record.id,
        onChange: (user) => {
          if (user) currentUserStore.setData({ authStatus: "loggedIn", user });
          else currentUserStore.setData({ authStatus: "loggedOut" });
        },
      });
    })();
  }, [unverifiedIsLoggedInStore.data]);

  useEffect(() => {
    if (currentUserStore.data.authStatus === "loading") return p.onIsLoading();
    if (currentUserStore.data.authStatus === "loggedIn")
      return p.onIsLoggedIn({ user: currentUserStore.data.user });
    if (currentUserStore.data.authStatus === "loggedOut") return p.onIsLoggedOut();

    console.error("should never be hit");
  }, [currentUserStore.data]);

  return currentUserStore.data;
};

export default function App({ Component, pageProps }: AppProps) {
  const themeStore = useThemeStore();
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  const marketBuyerProfileRecordStore = useMarketBuyerProfileRecordStore();
  const marketBuyerProfileRecordsStore = useMarketBuyerProfileRecordsStore();
  const marketSellerProfileRecordStore = useMarketSellerProfileRecordStore();
  const marketSellerProfileRecordsStore = useMarketSellerProfileRecordsStore();
  const messengerMessageRecordsStore = useMessengerMessageRecordsStore();

  themeStore.useThemeStoreSideEffect();

  useAuth({
    onIsLoading: () => {},
    onIsLoggedIn: ({ user }) => {
      smartSubscribeToUsers({ pb, onChange: (x) => usersStore.setData(x) });
      smartSubscribeToMarketBuyerProfileRecords({
        pb,
        onChange: (x) => marketBuyerProfileRecordsStore.setData(x),
        onError: () => {},
      });
      smartSubscribeToMarketBuyerProfileRecord({
        pb,
        id: user.id,
        onChange: (x) => marketBuyerProfileRecordStore.setData(x),
        onError: () => marketBuyerProfileRecordStore.setData(null),
      });
      smartSubscribeToMarketSellerProfileRecords({
        pb,
        onChange: (x) => marketSellerProfileRecordsStore.setData(x),
        onError: () => {},
      });
      smartSubscribeToMarketSellerProfileRecord({
        pb,
        id: user.id,
        onChange: (x) => marketSellerProfileRecordStore.setData(x),
        onError: () => marketSellerProfileRecordStore.setData(null),
      });
      smartSubscribeToMessengerMessageRecords({
        pb,
        onChange: (x) => messengerMessageRecordsStore.setData(x),
        onError: () => {},
      });
    },
    onIsLoggedOut: () => {},
  });

  return (
    <>
      <Head>
        <title>pokkit Market</title>
      </Head>
      <Layout
        showLeftSidebar={
          currentUserStore.data.authStatus === "loggedIn" &&
          ["approved", "admin"].includes(currentUserStore.data.user.status)
        }
      >
        <Toaster />
        {(() => {
          if (currentUserStore.data.authStatus === "loading") return <LoadingScreen />;

          if (currentUserStore.data.authStatus === "loggedOut")
            return (
              <div className="mt-16 flex justify-center">
                <AuthForm />
              </div>
            );

          // should not be required
          if (currentUserStore.data.authStatus !== "loggedIn") {
            console.error(`this line should never be hit`);
            return;
          }

          if (currentUserStore.data.user.role === "seller") {
            if (marketSellerProfileRecordStore.data === undefined) return <LoadingScreen />;
            if (marketSellerProfileRecordStore.data === null)
              return <SellerOnboardingScreen user={currentUserStore.data.user} />;
          }
          if (currentUserStore.data.user.role === "buyer") {
            if (marketBuyerProfileRecordStore.data === undefined) return <LoadingScreen />;
            if (marketBuyerProfileRecordStore.data === null)
              return <BuyerOnboardingScreen user={currentUserStore.data.user} />;
          }

          if (currentUserStore.data.user.status === "pending") return <AwaitingApprovalScreen />;

          if (currentUserStore.data.user.status === "blocked") return <BlockedScreen />;

          return <Component {...pageProps} />;
        })()}
      </Layout>
    </>
  );
}
