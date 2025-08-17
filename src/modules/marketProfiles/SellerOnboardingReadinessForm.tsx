import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormSection } from "@/components/ui/FormHelpers";
import { H1 } from "@/components/ui/defaultComponents";
import { CustomIcon } from "@/components/CustomIcon";

// export const SellerOnboardingReadinessForm = (p: { user: TUser }) => {
export const SellerOnboardingReadinessForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketplace Readiness Check</CardTitle>
        <CardDescription>
          Complete these final steps to start receiving project opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Onboarding Checklist</H1>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Identity & Credentials Verified</span>
                  <span className="text-sm text-muted-foreground">
                    Your professional qualifications have been verified
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Preferences Added</span>
                  <span className="text-sm text-muted-foreground">
                    Your project preferences have been set
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Onboarding Call Booked</span>
                  <span className="text-sm text-muted-foreground">
                    A call with a member of the team to ensure you're set up
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Success Strategies</span>
                  <span className="text-sm text-muted-foreground">
                    Learn how top CSOs maximise their opportunities
                  </span>
                </div>
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <div className="flex h-48 items-center justify-center">
                <H1>Ready to receive projects</H1>
              </div>
            </div>
          </FormSection>
        </div>
      </CardContent>
    </Card>
  );
};
