import { MainLayout } from "@/components/layout/Layout";
import { BuyerOnboardingForm } from "../BuyerOnboardingForm";
import { TUser } from "@/modules/users/dbUsersUtils";
import { H1 } from "@/components/ui/defaultComponents";

export const BuyerOnboardingScreen = (p: { user: TUser }) => {
  return (
    <MainLayout>
      <H1>Buyer</H1>
      <BuyerOnboardingForm user={p.user} />
    </MainLayout>
  );
};
