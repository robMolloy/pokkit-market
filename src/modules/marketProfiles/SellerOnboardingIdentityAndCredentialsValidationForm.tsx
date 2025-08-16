import { CustomIcon } from "@/components/CustomIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileInput, TextInput } from "@/components/ui/input";
import { pb } from "@/config/pocketbaseConfig";
import { useFileUrl } from "@/lib/fileUtils";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";
import { TUser } from "../users/dbUsersUtils";
import { createMarketSellerProfileRecord } from "./dbMarketSellerProfileRecordUtils";
import { H1 } from "@/components/ui/defaultComponents";
import { DatePicker } from "@/components/DatePicker";

const FormSection = (p: { children: React.ReactNode }) => {
  return <div className="rounded-lg border p-4">{p.children}</div>;
};
const FormInputRowCollapse = (p: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:*:flex-1">{p.children}</div>
  );
};

export const SellerOnboardingIdentityAndCredentialsValidationForm = (p: { user: TUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [countryOfRegistration, setCountryOfRegistration] = useState("");

  const fileUrl = useFileUrl(image);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity & Credential Verification</CardTitle>
        <CardDescription>
          We need to verify your identity and professional qualifications to ensure compliance with
          NHS England standards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Personal Information</H1>
              <FormInputRowCollapse>
                <div>
                  <Label id="seller-name-input">Full Legal Name</Label>
                  <TextInput
                    id="seller-name-input"
                    placeholder="As shown on official documents"
                    value={name}
                    onInput={(x) => setName(x)}
                  />
                </div>
                <div>
                  <Label id="seller-dob-input">Date of Birth</Label>
                  <DatePicker
                    id="seller-dob-input"
                    value={dateOfBirth}
                    onChange={(x) => setDateOfBirth(x)}
                    placeholder="Select date"
                  />
                </div>
              </FormInputRowCollapse>
              <div>
                <Label id="seller-country-of-registration-input">Country of Registration</Label>
                <TextInput
                  id="seller-country-of-registration-input"
                  placeholder="Select your country of professional registration"
                  value={countryOfRegistration}
                  onInput={(x) => setCountryOfRegistration(x)}
                />
              </div>
            </div>
          </FormSection>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const resp = await (() => {
              if (!image) return { success: false } as const;
              const data = { id: p.user.id, name, description, image, userId: p.user.id };
              return createMarketSellerProfileRecord({ pb, data });
            })();
            console.log(`SellerOnboardingForm.tsx:${/*LL*/ 29}`, resp);

            toast(
              resp.success
                ? "Successfully submitted your seller profile!"
                : "Something went wrong!",
              { duration: 10_000 },
            );
          }}
          className="flex flex-col gap-4 rounded-lg border p-4"
        >
          <div>
            <Label id="seller-name-input" />
            <TextInput
              id="seller-name-input"
              placeholder="Enter your name"
              value={name}
              onInput={(x) => setName(x)}
            />
          </div>
          <div>
            <Label id="seller-description-input" />
            <TextInput
              id="seller-description-input"
              placeholder="Enter your description"
              value={description}
              onInput={(x) => setDescription(x)}
            />
          </div>
          <div>
            <Label id="seller-imageUrl-input" />
            <FileInput
              id="seller-imageUrl-input"
              placeholder="Enter your imageUrl"
              value={image}
              onInput={(x) => setImage(x)}
            />
          </div>

          <div className="flex justify-center">
            {fileUrl ? (
              <div className="relative">
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-0 top-0 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setImage(undefined);
                  }}
                >
                  <CustomIcon iconName="X" size="xs" />
                </Button>
                <img className="h-24" src={fileUrl} />
              </div>
            ) : (
              <CustomIcon iconName="Image" size="4xl" />
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
