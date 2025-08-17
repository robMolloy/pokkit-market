import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormInputRowCollapse, FormSection } from "@/components/ui/FormHelpers";
import { H1 } from "@/components/ui/defaultComponents";
import { TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";

// export const SellerOnboardingPreferencesForm = (p: { user: TUser }) => {
export const SellerOnboardingPreferencesForm = () => {
  const [preferredOrgTypes, setPreferredOrgTypes] = useState("");
  const [preferredWorkTypes, setPreferredWorkTypes] = useState("");
  const [hoursAvailablePerWeek, setHoursAvailablePerWeek] = useState(5);
  const [earliestStartDate, setEarliestStartDate] = useState<Date | undefined>(undefined);
  const [travelWillingness, setTravelWillingness] = useState("");
  const [flexibleSchedule, setFlexibleSchedule] = useState(false);
  const [dayRate, setDayRate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [acceptNdas, setAcceptNdas] = useState(false);
  const [acceptWorkFromHome, setAcceptWorkFromHome] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Job Preferences</CardTitle>
        <CardDescription>
          Configure your availability and preferences to receive the most relevant opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Industries You Want to Work With</H1>

              <div>
                {/* TODO should be a multiselect - view claude example */}
                <Label htmlFor="seller-preferredOrgTypes-input">
                  Select the types of organizations you'd like to work with:
                </Label>
                <TextInput
                  value={preferredOrgTypes}
                  onInput={(x) => setPreferredOrgTypes(x)}
                  id="seller-preferredOrgTypes-input"
                  placeholder="What is your preferred industry?"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Project Types</H1>

              <div>
                {/* TODO should be a multiselect - view claude example */}
                <Label htmlFor="seller-preferredWorkTypes-input">
                  Select types of clinical safety work are you interested in?
                </Label>
                <TextInput
                  value={preferredWorkTypes}
                  onInput={(x) => setPreferredWorkTypes(x)}
                  id="seller-preferredWorkTypes-input"
                  placeholder="What is your preferred type of clinical safety work?"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Availability</H1>

              <div>
                {/* TODO should be a multiselect - view claude example */}
                <Label htmlFor="seller-preferredOrgTypes-input">
                  How many hours per week are you available for CSO work?
                </Label>
                <Slider
                  min={0}
                  max={40}
                  step={1}
                  value={[hoursAvailablePerWeek]}
                  onValueChange={(x) => {
                    const value = x[0];
                    if (value !== undefined) setHoursAvailablePerWeek(value);
                  }}
                />
                <div className="mt-1 flex">
                  <span className="flex-1 text-muted-foreground">0</span>
                  <span>{hoursAvailablePerWeek} hours per week</span>
                  <span className="flex-1 text-right text-muted-foreground">40</span>
                </div>
              </div>
              <FormInputRowCollapse>
                <div>
                  <Label htmlFor="seller-earliestStartDate-input">Earliest start date</Label>
                  <DatePicker
                    id="seller-earliestStartDate-input"
                    value={earliestStartDate}
                    onChange={(x) => setEarliestStartDate(x)}
                    placeholder="Select date"
                    disabled={{
                      from: new Date(0),
                      to: (() => {
                        const date = new Date();
                        date.setDate(date.getDate() - 1);
                        return date;
                      })(),
                    }}
                  />
                </div>
                <div>
                  {/* TODO should be a select  */}
                  <Label htmlFor="seller-travelWillingness-input">Travel Willingness</Label>
                  <TextInput
                    value={travelWillingness}
                    onInput={(x) => setTravelWillingness(x)}
                    id="seller-travelWillingness-input"
                    placeholder="Select Travel preference"
                  />
                </div>
              </FormInputRowCollapse>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="toggle-2"
                  checked={flexibleSchedule}
                  onCheckedChange={() => setFlexibleSchedule((x) => !x)}
                />
                <Label htmlFor="toggle-2">
                  I have a flexible schedule and can accommodate urgent projects
                </Label>
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Rate Structure</H1>
              <div>
                Set your preferred rates. You can provide either day rates, hourly rates, or both.
              </div>

              <FormInputRowCollapse>
                <div>
                  <Label htmlFor="seller-dayRate-input">Day Rate</Label>
                  <TextInput
                    id="seller-dayRate-input"
                    placeholder="e.g. £600"
                    value={dayRate}
                    onInput={(x) => setDayRate(x)}
                  />
                  <div className="text-sm text-muted-foreground">Per 8-hour day</div>
                </div>
                <div>
                  <Label htmlFor="seller-hourlyRate-input">Hourly Rate</Label>
                  <TextInput
                    id="seller-hourlyRate-input"
                    placeholder="e.g. £100"
                    value={hourlyRate}
                    onInput={(x) => setHourlyRate(x)}
                  />
                  <div className="text-sm text-muted-foreground">Per hour</div>
                </div>
              </FormInputRowCollapse>
              <div className="rounded-md bg-secondary p-2 text-sm text-secondary-foreground">
                <span className="font-bold">Market rates:</span> CSO day rates typically range from
                £400-£800 depending on experience and specialization.
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Work Preferences</H1>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="toggle-2"
                  checked={acceptNdas}
                  onCheckedChange={() => setAcceptNdas((x) => !x)}
                />
                <Label htmlFor="toggle-2">I'm willing to sign NDAs for confidential projects</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="toggle-2"
                  checked={acceptWorkFromHome}
                  onCheckedChange={() => setAcceptWorkFromHome((x) => !x)}
                />
                <Label htmlFor="toggle-2">I'm comfortable working remotely</Label>
              </div>
            </div>
          </FormSection>
        </div>
      </CardContent>
    </Card>
  );
};
