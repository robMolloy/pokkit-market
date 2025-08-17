import { MainLayout } from "@/components/layout/Layout";
import { H1 } from "@/components/ui/defaultComponents";
import { TUser } from "@/modules/users/dbUsersUtils";
import { StepProgress } from "@/components/StepProgress";
import { SellerOnboardingIdentityAndCredentialsValidationForm } from "../SellerOnboardingIdentityAndCredentialsValidationForm";
import { useState } from "react";

export const SellerOnboardingScreen = (p: { user: TUser }) => {
  const [stepNumber, setStepNumber] = useState(0);

  return (
    <MainLayout>
      <H1>Seller</H1>
      <button onClick={() => setStepNumber(stepNumber + 1)}>next</button>
      <button onClick={() => setStepNumber(0)}>reset</button>
      <StepProgress
        value={stepNumber}
        onChange={(x) => setStepNumber(x)}
        steps={[
          { label: "Personal Info" },
          { label: "Address" },
          { label: "Payment" },
          { label: "Review" },
          { label: "Complete" },
        ]}
      />

      <SellerOnboardingIdentityAndCredentialsValidationForm user={p.user} />
    </MainLayout>
  );
};
