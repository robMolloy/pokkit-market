import { MainLayout } from "@/components/layout/Layout";
import { StepProgress } from "@/components/StepProgress";
import { H1 } from "@/components/ui/defaultComponents";
import { TUser } from "@/modules/users/dbUsersUtils";
import { useState } from "react";
import { SellerOnboardingIdentityAndCredentialsValidationForm } from "../SellerOnboardingIdentityAndCredentialsValidationForm";
import { SellerOnboardingProfessionalProfileForm } from "../SellerOnboardingProfessionalProfileForm";
import { SellerOnboardingPreferencesForm } from "../SellerOnboardingPreferencesForm";
import { SellerOnboardingCallForm } from "../SellerOnboardingCallForm";
import { SellerOnboardingReadinessForm } from "../SellerOnboardingReadinessForm";
import { useMarketSellerProfileRecordStore } from "../marketSellerProfileRecordStore";

const steps = [
  { label: "Verification" },
  { label: "Profile" },
  { label: "Preferences" },
  { label: "Onboarding Call" },
  { label: "Readiness" },
];

export const SellerOnboardingScreen = (p: { user: TUser }) => {
  const [stepNumber, setStepNumber] = useState(0);

  const marketSellerProfileRecordStore = useMarketSellerProfileRecordStore();

  return (
    <MainLayout>
      <H1>Seller</H1>
      <br />
      <StepProgress value={stepNumber} onChange={(x) => setStepNumber(x)} steps={steps} />
      <br />

      {((marketSellerProfileRecordStore.data && stepNumber === 0) ||
        marketSellerProfileRecordStore.data === null) && (
        <SellerOnboardingIdentityAndCredentialsValidationForm
          user={p.user}
          marketSellerProfileRecord={marketSellerProfileRecordStore.data}
          onSuccess={() => setStepNumber(1)}
        />
      )}
      {marketSellerProfileRecordStore.data && (
        <>
          {stepNumber === 1 && (
            <SellerOnboardingProfessionalProfileForm
              marketSellerProfileRecord={marketSellerProfileRecordStore.data}
              onSuccess={() => setStepNumber(2)}
            />
          )}
          {stepNumber === 2 && <SellerOnboardingPreferencesForm />}
          {stepNumber === 3 && <SellerOnboardingCallForm />}
          {stepNumber === 4 && <SellerOnboardingReadinessForm />}
        </>
      )}

      <button onClick={() => setStepNumber(stepNumber + 1)}>next</button>
      <button onClick={() => setStepNumber(0)}>reset</button>
    </MainLayout>
  );
};
