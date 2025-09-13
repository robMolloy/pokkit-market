import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileInputDrop, TextInput } from "@/components/ui/input";

import { DatePicker } from "@/components/DatePicker";
import { H1 } from "@/components/ui/defaultComponents";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pb } from "@/config/pocketbaseConfig";
import { useState } from "react";
import { toast } from "sonner";
import { TUser } from "../users/dbUsersUtils";
import {
  createMarketSellerProfileRecord,
  TMarketSellerProfileRecord,
  updateMarketSellerProfileRecord,
} from "./dbMarketSellerProfileRecordUtils";
import { useFileFromPbRecordOnMount } from "@/lib/fileUtils";

const FormSection = (p: { children: React.ReactNode }) => {
  return <div className="rounded-lg border p-4">{p.children}</div>;
};

const FormInputRowCollapse = (p: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:*:flex-1">{p.children}</div>
  );
};

export const SellerOnboardingIdentityAndCredentialsValidationForm = (p: {
  user: TUser;
  marketSellerProfileRecord: TMarketSellerProfileRecord | null;
  onSuccess: () => void;
}) => {
  const [name, setName] = useState(p.marketSellerProfileRecord?.name ?? "");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    p.marketSellerProfileRecord?.dateOfBirth
      ? new Date(p.marketSellerProfileRecord.dateOfBirth)
      : undefined,
  );
  const [countryOfRegistration, setCountryOfRegistration] = useState<
    TMarketSellerProfileRecord["countryOfRegistration"] | undefined
  >(p.marketSellerProfileRecord?.countryOfRegistration);

  const [identityDocumentFile, setIdentityDocumentFile] = useState<File>();
  useFileFromPbRecordOnMount({
    pb,
    record: p.marketSellerProfileRecord,
    fileUrl: p.marketSellerProfileRecord?.identityDocumentFileUrl,
    onSuccess: (x) => setIdentityDocumentFile(x),
  });

  const [clinicalSafetyCertificateFile, setClinicalSafetyCertificateFile] = useState<File>();
  useFileFromPbRecordOnMount({
    pb,
    record: p.marketSellerProfileRecord,
    fileUrl: p.marketSellerProfileRecord?.clinicalSafetyCertificateFileUrl,
    onSuccess: (x) => setClinicalSafetyCertificateFile(x),
  });

  const [professionalBody, setProfessionalBody] = useState(
    p.marketSellerProfileRecord?.professionalBody ?? "",
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    p.marketSellerProfileRecord?.registrationNumber ?? "",
  );

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

            const resp = await (() => {
              const exists = !!p.marketSellerProfileRecord?.id;
              const fn = exists ? updateMarketSellerProfileRecord : createMarketSellerProfileRecord;
              return fn({
                pb,
                data: {
                  id: p.user.id,
                  userId: p.user.id,
                  name,
                  dateOfBirth: dateOfBirth?.toISOString(),
                  countryOfRegistration,
                  professionalBody,
                  registrationNumber,
                  identityDocumentFile,
                  clinicalSafetyCertificateFile,
                },
              });
            })();

            if (!resp.success) return toast("Something went wrong!", { duration: 10_000 });

            toast("Successfully submitted your seller profile!", { duration: 10_000 });
            p.onSuccess();
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

                  <Select
                    value={countryOfRegistration}
                    onValueChange={(initValue) => {
                      const value = initValue as typeof countryOfRegistration;
                      setCountryOfRegistration(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Country of registration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Ireland">Ireland</SelectItem>
                      <SelectItem value="Other (EU)">Other (EU)</SelectItem>
                      <SelectItem value="Other (Outside EU)">Other (Outside EU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FormSection>
            <FormSection>
              <div className="flex flex-col gap-4">
                <H1>Professional Credentials</H1>
                <FormInputRowCollapse>
                  <div>
                    <Label htmlFor="seller-professionalBody-input">Professional Body</Label>

                    <Select value={professionalBody} onValueChange={(x) => setProfessionalBody(x)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Professional body" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMC">United Kingdom</SelectItem>
                        <SelectItem value="NMC">NMC (Nursing & Midwifery Council)</SelectItem>
                        <SelectItem value="HCPC">
                          HCPC (Health & Care Professions Council)
                        </SelectItem>
                        <SelectItem value="GPhC">GPhC (General Pharmaceutical Council)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    onInput={(x) => setIdentityDocumentFile(x)}
                  >
                    Add document or image
                  </FileInputDrop>
                </Label>
                <Label htmlFor="seller-clinicalSafetyCertificate-input">
                  Clinical Safety Certificate (Required)
                  <FileInputDrop
                    id="seller-clinicalSafetyCertificate-input"
                    value={clinicalSafetyCertificateFile}
                    onInput={(x) => setClinicalSafetyCertificateFile(x)}
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
