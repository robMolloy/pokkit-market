import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormSection } from "@/components/ui/FormHelpers";
import { H1 } from "@/components/ui/defaultComponents";
import { CustomIcon } from "@/components/CustomIcon";

// export const SellerOnboardingCallForm = (p: { user: TUser }) => {
export const SellerOnboardingCallForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Onboarding Call</CardTitle>
        <CardDescription>
          Schedule a 15-minute call with our team to personalise your experience and answer any
          questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>What we'll cover</H1>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Platform Walkthrough</span>
                  <span className="text-sm text-muted-foreground">
                    Get a personalised tour of the platform features
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Profile Optimisation</span>
                  <span className="text-sm text-muted-foreground">
                    Tips to make your profile stand out to clients
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <CustomIcon iconName="CheckCircle" size="lg" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-lg font-bold">Q&A Session</span>
                  <span className="text-sm text-muted-foreground">
                    Ask questions about projects, rates, and best practices
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
                <H1>Calendly Integration</H1>
              </div>
            </div>
          </FormSection>
        </div>
      </CardContent>
    </Card>
  );
};
