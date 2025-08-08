import { useCurrentUserStore, useUnverifiedIsLoggedInStore } from "@/stores/authDataStore";
import { useUsersStore } from "../users/usersStore";

export const LogScreen = () => {
  const usersStore = useUsersStore();
  const currentUserStore = useCurrentUserStore();
  const unverifiedIsLoggedInStore = useUnverifiedIsLoggedInStore();

  return (
    <div>
      <pre>
        {JSON.stringify({ usersStore, currentUserStore, unverifiedIsLoggedInStore }, undefined, 2)}
      </pre>
    </div>
  );
};
