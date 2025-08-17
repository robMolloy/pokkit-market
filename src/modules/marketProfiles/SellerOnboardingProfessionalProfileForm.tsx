import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { FormSection } from "@/components/ui/FormHelpers";
import { H1 } from "@/components/ui/defaultComponents";
import { FileInputDrop, TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// export const SellerOnboardingProfessionalProfileForm = (p: { user: TUser }) => {
export const SellerOnboardingProfessionalProfileForm = () => {
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | undefined>(undefined);
  const [professionalHeadline, setProfessionalHeadline] = useState("");
  const [professionalBio, setProfessionalBio] = useState("");
  const [linkedInProfileUrl, setLinkedInProfileUrl] = useState("");
  const [areasOfExpertise, setAreasOfExpertise] = useState<string>("");
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("");
  const [industriesServed, setIndustriesServed] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Professional Profile</CardTitle>
        <CardDescription>
          Showcase your expertise to potential clients and build trust
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormSection>
            <div className="flex flex-col gap-4">
              <H1>Professional Summary</H1>

              <div>
                <Label htmlFor="seller-professionalHeadline-input">Professional Headline</Label>
                <TextInput
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
        </div>
      </CardContent>
    </Card>
  );
};
