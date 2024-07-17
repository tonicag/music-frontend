"use client";

import useAuthStore from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  return <div>App page</div>;
}
