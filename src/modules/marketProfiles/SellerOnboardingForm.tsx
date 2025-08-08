import { FileInput, TextInput } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { TUser } from "../users/dbUsersUtils";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/CustomIcon";
import { useFileUrl } from "@/lib/fileUtils";
import { createMarketSellerProfileRecord } from "./dbMarketSellerProfileRecordUtils";
import { pb } from "@/config/pocketbaseConfig";
import { toast } from "sonner";

export const SellerOnboardingForm = (p: { user: TUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);

  const fileUrl = useFileUrl(image);

  return (
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
          resp.success ? "Successfully submitted your seller profile!" : "Something went wrong!",
          { duration: 10_000 },
        );
      }}
      className="flex flex-col gap-4"
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
  );
};
