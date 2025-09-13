import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormSection } from "@/components/ui/FormHelpers";
import { H1 } from "@/components/ui/defaultComponents";
import { FileInputDrop, TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  createMarketSellerProfileRecord,
  TMarketSellerProfileRecord,
  updateMarketSellerProfileRecord,
} from "./dbMarketSellerProfileRecordUtils";
import { pb } from "@/config/pocketbaseConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFileFromPbRecordOnMount } from "@/lib/fileUtils";

export const SellerOnboardingProfessionalProfileForm = (p: {
  marketSellerProfileRecord: TMarketSellerProfileRecord;
  onSuccess: () => void;
}) => {
  const [profilePhotoFile, setProfilePhotoFile] = useState<File>();
  useFileFromPbRecordOnMount({
    pb,
    record: p.marketSellerProfileRecord,
    fileUrl: p.marketSellerProfileRecord?.profilePhotoFileUrl,
    onSuccess: (x) => setProfilePhotoFile(x),
  });

  const [professionalHeadline, setProfessionalHeadline] = useState(
    p.marketSellerProfileRecord?.professionalHeadline ?? "",
  );
  const [professionalBio, setProfessionalBio] = useState(
    p.marketSellerProfileRecord?.professionalBio ?? "",
  );
  const [linkedInProfileUrl, setLinkedInProfileUrl] = useState(
    p.marketSellerProfileRecord?.linkedInProfileUrl ?? "",
  );
  const [areasOfExpertise, setAreasOfExpertise] = useState(
    p.marketSellerProfileRecord?.areasOfExpertise ?? "",
  );
  const [yearsOfExperience, setYearsOfExperience] = useState(
    p.marketSellerProfileRecord?.yearsOfExperience ?? "",
  );
  const [industriesServed, setIndustriesServed] = useState(
    p.marketSellerProfileRecord?.industriesServed ?? "",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Professional Profile</CardTitle>
        <CardDescription>
          Showcase your expertise to potential clients and build trust
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
                  id: p.marketSellerProfileRecord.id,
                  profilePhotoFile,
                  professionalHeadline,
                  professionalBio,
                  linkedInProfileUrl,
                  areasOfExpertise,
                  yearsOfExperience,
                  industriesServed,
                },
              });
            })();

            if (!resp.success) return toast("Something went wrong!", { duration: 10_000 });

            toast("Successfully submitted your seller profile!", { duration: 10_000 });
            p.onSuccess();
          }}
          className="flex flex-col gap-4"
        >
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Professional Summary</H1>

              <div>
                <Label htmlFor="seller-professionalHeadline-input">Professional Headline</Label>
                <TextInput
                  autoFocus
                  value={professionalHeadline}
                  onInput={(x) => setProfessionalHeadline(x)}
                  id="seller-professionalHeadline-input"
                  placeholder="e.g. Senior Clinical Safety Officer | NHS Digital Health Expert"
                />
              </div>
              <div>
                <Label htmlFor="seller-professionalBio-input">Professional Bio</Label>
                {/* TODO should be textarea */}
                <TextInput
                  value={professionalBio}
                  onInput={(x) => setProfessionalBio(x)}
                  id="seller-professionalBio-input"
                  placeholder="Tell your potential clients about your expertise, experience and approach to clinical safety"
                />
              </div>
              <div>
                <Label htmlFor="seller-linkedInProfileUrl-input">LinkedIn Profile Url</Label>
                <TextInput
                  value={linkedInProfileUrl}
                  onInput={(x) => setLinkedInProfileUrl(x)}
                  id="seller-linkedInProfileUrl-input"
                  placeholder="e.g. Senior Clinical Safety Officer | NHS Digital Health Expert"
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Profile Photo</H1>
              <Label htmlFor="seller-profilePhoto-input">
                Upload a photo of yourself
                <FileInputDrop
                  id="seller-profilePhoto-input"
                  value={profilePhotoFile}
                  onInput={setProfilePhotoFile}
                >
                  Select Profile Photo
                </FileInputDrop>
              </Label>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Areas of Specialisation</H1>
              <div>
                <Label htmlFor="seller-areasOfExpertise-input">Areas of Expertise</Label>
                <TextInput
                  id="seller-areasOfExpertise-input"
                  placeholder="e.g. Clinical Safety, Data Science, Health Informatics"
                  value={areasOfExpertise}
                  onInput={(x) => setAreasOfExpertise(x)}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Experience and Industry Focus</H1>
              <div>
                <Label htmlFor="seller-yearsOfExperience-input">Years of Experience</Label>
                {/* TODO should be a select */}
                <TextInput
                  id="seller-yearsOfExperience-input"
                  placeholder="Experience in number of years"
                  value={yearsOfExperience}
                  onInput={(x) => setYearsOfExperience(x)}
                />
              </div>
              <div>
                {/* TODO should be a select */}
                <Label htmlFor="seller-industriesServed-input">Industries Served</Label>
                <TextInput
                  id="seller-industriesServed-input"
                  placeholder="Experience in number of years"
                  value={industriesServed}
                  onInput={(x) => setIndustriesServed(x)}
                />
              </div>
            </div>
          </FormSection>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
