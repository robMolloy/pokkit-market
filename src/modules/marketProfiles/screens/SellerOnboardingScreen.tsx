import { MainLayout } from "@/components/layout/Layout";
import { TUser } from "@/modules/users/dbUsersUtils";
import { SellerOnboardingForm } from "../SellerOnboardingForm";
import { H1 } from "@/components/ui/defaultComponents";

export const SellerOnboardingScreen = (p: { user: TUser }) => {
  return (
    <MainLayout>
      <H1>Seller</H1>
      <SellerOnboardingForm user={p.user} />
    </MainLayout>
  );
};
