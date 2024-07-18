import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type User = {
  id: number;
  email: string;
  username: string;
};

type AuthStore = {
  isLoggedIn: boolean;
  user: User | null;
  token: string;
  ready: boolean;
  setReady: (ready: boolean) => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      token: "",
      user: null,
      isLoggedIn: false,
      ready: false,
      setReady: (ready: boolean) => set({ ready }),
    })),
    {
      name: "auth-store",
      onRehydrateStorage: () => (state) => {
        state?.setReady(true);
      },
    }
  )
);

export async function login(values: { username: string; password: string }) {
  try {
    const {
      data: { data },
    } = await axios.post("http://localhost:8000/auth/login", values);
    console.log({ data });
    if (data) {
      useAuthStore.setState((state) => {
        state.isLoggedIn = true;
        state.token = data.token;
        state.user = data.user;
      });
      console.log({ store: useAuthStore.getState() });
    }

    return true;
  } catch (e) {
    toast({
      variant: "info",
      title: "Wrong username or password!",
    });
    return false;
  }
}

export default useAuthStore;
