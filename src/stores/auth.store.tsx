import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthStore = {
  isLoggedIn: boolean;
  userId: number | null;
  token: string;
};

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({ token: "", userId: null, isLoggedIn: false })),
    { name: "auth-store" }
  )
);

export default useAuthStore;
