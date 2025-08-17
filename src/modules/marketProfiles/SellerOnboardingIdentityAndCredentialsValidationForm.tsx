import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileInputDrop, TextInput } from "@/components/ui/input";

import { DatePicker } from "@/components/DatePicker";
import { H1 } from "@/components/ui/defaultComponents";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TUser } from "../users/dbUsersUtils";

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
  // const [description, setDescription] = useState("");
  // const [image, setImage] = useState<File | undefined>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [countryOfRegistration, setCountryOfRegistration] = useState("");
  const [identityDocumentFile, setIdentityDocumentFile] = useState<File | undefined>(undefined);
  const [clinicalSafetyCertificateFile, setClinicalSafetyCertificateFile] = useState<
    File | undefined
  >(undefined);
  const [professionalBody, setProfessionalBody] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(`SellerOnboardingIdentityAndCredentialsValidationForm.tsx:${/*LL*/ 46}`, {
              p,
            });

            // const resp = await (() => {
            //   if (!image) return { success: false } as const;
            //   const data = { id: p.user.id, name, description, image, userId: p.user.id };
            //   return createMarketSellerProfileRecord({ pb, data });
            // })();
            // console.log(`SellerOnboardingForm.tsx:${/*LL*/ 29}`, resp);

            // toast(
            //   resp.success
            //     ? "Successfully submitted your seller profile!"
            //     : "Something went wrong!",
            //   { duration: 10_000 },
            // );
          }}
        >
          <div className="flex flex-col gap-4">
            <FormSection>
              <div className="flex flex-col gap-4">
                <H1>Personal Information</H1>
                <FormInputRowCollapse>
                  <div>
                    <Label htmlFor="seller-name-input">Full Legal Name</Label>

                    <TextInput
                      id="seller-name-input"
                      placeholder="As shown on official documents"
                      value={name}
                      onInput={(x) => setName(x)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seller-dob-input">Date of Birth</Label>
                    <DatePicker
                      id="seller-dob-input"
                      value={dateOfBirth}
                      onChange={(x) => setDateOfBirth(x)}
                      placeholder="Select date"
                    />
                  </div>
                </FormInputRowCollapse>
                <div>
                  <Label htmlFor="seller-countryOfRegistration-input">
                    Country of Registration
                  </Label>

                  <TextInput
                    id="seller-countryOfRegistration-input"
                    placeholder="Select your country of professional registration"
                    value={countryOfRegistration}
                    onInput={(x) => setCountryOfRegistration(x)}
                  />
                </div>
              </div>
            </FormSection>
            <FormSection>
              <div className="flex flex-col gap-4">
                <H1>Professional Credentials</H1>
                <FormInputRowCollapse>
                  <div>
                    <Label htmlFor="seller-professionalBody-input">Professional Body</Label>
                    <TextInput
                      id="seller-professionalBody-input"
                      placeholder="Select registration type"
                      value={professionalBody}
                      onInput={(x) => setProfessionalBody(x)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seller-registrationNumber-input">Registration Number</Label>
                    <TextInput
                      id="seller-registrationNumber-input"
                      placeholder="e.g. GMC123456"
                      value={registrationNumber}
                      onInput={(x) => setRegistrationNumber(x)}
                    />
                  </div>
                </FormInputRowCollapse>
              </div>
            </FormSection>
            <FormSection>
              <div className="flex flex-col gap-4">
                <H1>Document Uploads</H1>
                <Label htmlFor="seller-identityDocument-input">
                  Identity Document (Required)
                  <FileInputDrop
                    id="seller-identityDocument-input"
                    value={identityDocumentFile}
                    onInput={setIdentityDocumentFile}
                  >
                    Add document or image
                  </FileInputDrop>
                </Label>
                <Label htmlFor="seller-clinicalSafetyCertificate-input">
                  Clinical Safety Certificate (Required)
                  <FileInputDrop
                    id="seller-clinicalSafetyCertificate-input"
                    value={clinicalSafetyCertificateFile}
                    onInput={setClinicalSafetyCertificateFile}
                  >
                    Add document or image
                  </FileInputDrop>
                </Label>
              </div>
            </FormSection>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
