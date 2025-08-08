import { CustomIcon } from "@/components/CustomIcon";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TUser } from "@/modules/users/dbUsersUtils";
import React, { useEffect, useState } from "react";

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

function ClickableCard(p: { children: React.ReactNode; onClick: () => void; isSelected: boolean }) {
  return (
    <Card
      className={`h-20 cursor-pointer transition-all duration-200 hover:border-4 hover:bg-secondary ${
        p.isSelected ? "border-2 bg-secondary/75" : ""
      }`}
      onClick={p.onClick}
    >
      <div className="flex h-full items-center justify-center">{p.children}</div>
    </Card>
  );
}

export const RolePicker = (p: {
  value: TUser["role"];
  onChange: (x: Pick<TUser, "role">) => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<TUser["role"]>(p.value);

  useEffect(() => p.onChange({ role: selectedRole }), [selectedRole]);
  useEffect(() => setSelectedRole(p.value), [p.value]);

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <ClickableCard
          onClick={() => setSelectedRole("buyer")}
          isSelected={selectedRole === "buyer"}
        >
          <div className="flex gap-2">
            <CustomIcon iconName="HelpCircle" size="lg" />
            <div>buyer</div>
          </div>
        </ClickableCard>
      </div>
      <div className="flex-1">
        <ClickableCard
          onClick={() => setSelectedRole("seller")}
          isSelected={selectedRole === "seller"}
        >
          <div className="flex gap-2">
            <CustomIcon iconName="Stethoscope" size="lg" />
            <div>seller</div>
          </div>
        </ClickableCard>
      </div>
    </div>
  );
};
