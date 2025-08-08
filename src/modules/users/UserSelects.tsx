import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TUser } from "@/modules/users/dbUsersUtils";

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
