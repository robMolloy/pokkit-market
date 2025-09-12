import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/config/pocketbaseConfig";
import { useState } from "react";
import { TUser } from "../users/dbUsersUtils";
import { RolePicker } from "../users/UserSelects";

export function AuthSignup(p: {
  onSignUpSuccess: (message: string) => void;
  onSignUpError: (message: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<TUser["role"]>("buyer");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      p.onSignUpError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const payload = {
      name,
      email,
      status: "pending",
      role,
      emailVisibility: true,
      password,
      passwordConfirm: password,
    };
    try {
      await pb.collection("users").create(payload);
      console.log(`AuthSignup.tsx:${/*LL*/ 44}`, { payload });

      // After creating the user, log them in
      await pb.collection("users").authWithPassword(email, password);
      p.onSignUpSuccess("Account created successfully!");
    } catch (e: unknown) {
      const error = e as { message: string };
      console.error("Sign up error:", error);
      p.onSignUpError(error.message ?? "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" type="text" placeholder="Enter your full name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="signup-email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-role">Role</Label>
        <RolePicker value={role} onChange={({ role }) => setRole(role)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          name="signup-password"
          type="password"
          placeholder="Create a password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm your password"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
