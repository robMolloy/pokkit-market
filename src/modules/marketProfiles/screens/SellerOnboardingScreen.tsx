import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { TUser } from "@/modules/users/dbUsersUtils";
import { StepProgress } from "@/components/StepProgress";
import { SellerOnboardingIdentityAndCredentialsValidationForm } from "../SellerOnboardingIdentityAndCredentialsValidationForm";
import { useState } from "react";

const steps = [
  { label: "Verification" },
  { label: "Profile" },
  { label: "Preferences" },
  { label: "Onboarding Call" },
  { label: "Readiness" },
];

export const SellerOnboardingScreen = (p: { user: TUser }) => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <MainLayout>
      <H1>Seller</H1>
      <br />
      <StepProgress value={stepNumber} onChange={(x) => setStepNumber(x)} steps={steps} />
      <br />

      {stepNumber === 0 && <SellerOnboardingIdentityAndCredentialsValidationForm user={p.user} />}

      <button onClick={() => setStepNumber(stepNumber + 1)}>next</button>
      <button onClick={() => setStepNumber(0)}>reset</button>
    </MainLayout>
  );
};
