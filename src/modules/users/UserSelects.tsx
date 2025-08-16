import { CustomIcon } from "@/components/CustomIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TUser } from "@/modules/users/dbUsersUtils";
import { useEffect, useState } from "react";

const statusColorClassMap: { [k in TUser["status"]]: string } = {
  pending: "bg-muted",
  approved: "bg-green-500",
  blocked: "bg-destructive",
} as const;

export const UserStatusSelect = (p: {
  value: TUser["status"];
  onStatusChange: (x: Pick<TUser, "status">) => void;
  disabled?: boolean;
}) => {
  return (
    <Select
      value={p.value}
      onValueChange={(status: TUser["status"]) => p.onStatusChange({ status })}
      disabled={p.disabled}
    >
      <SelectTrigger className={`${statusColorClassMap[p.value]}`}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {p.value === "pending" && <SelectItem value="pending">Pending</SelectItem>}
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="blocked">Blocked</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const UserRoleSelect = (p: {
  value: TUser["role"];
  onStatusChange: (x: Pick<TUser, "role">) => void;
  disabled?: boolean;
}) => {
  return (
    <>
      <Select
        value={p.value}
        onValueChange={(role: TUser["role"]) => p.onStatusChange({ role })}
        disabled={p.disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="buyer">Buyer</SelectItem>
          <SelectItem value="seller">Seller</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export const RolePicker = (p: {
  value: TUser["role"];
  onChange: (x: Pick<TUser, "role">) => void;
}) => {
  const [innerValue, setInnerValue] = useState<TUser["role"]>(p.value ?? "buyer");

  useEffect(() => p.onChange({ role: innerValue }), [innerValue]);
  useEffect(() => setInnerValue(p.value), [p.value]);

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-1">
        <TabsTrigger
          value="signin"
          onClick={() => setInnerValue("buyer")}
          className="flex gap-2 py-4"
        >
          <CustomIcon iconName="Stethoscope" size="lg" />
          Buyer
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          onClick={() => setInnerValue("seller")}
          className="flex gap-2 py-4"
        >
          <CustomIcon iconName="HelpCircle" size="lg" />
          Seller
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
