import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { TUser } from "@/modules/users/dbUsersUtils";
import { StepProgress } from "@/components/StepProgress";
import { SellerOnboardingIdentityAndCredentialsValidationForm } from "../SellerOnboardingIdentityAndCredentialsValidationForm";
import { useState } from "react";

const steps = [
  { label: "Personal Info" },
  { label: "Address" },
  { label: "Payment" },
  { label: "Review" },
  { label: "Complete" },
];

export const SellerOnboardingScreen = (p: { user: TUser }) => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <MainLayout>
      <H1>Seller</H1>
      <StepProgress value={stepNumber} onChange={(x) => setStepNumber(x)} steps={steps} />

      <SellerOnboardingIdentityAndCredentialsValidationForm user={p.user} />
    </MainLayout>
  );
};
