"use client";

import { ReactNode, useEffect, useState } from "react";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/dashboard/sidebar/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page({ children }: { children: ReactNode }) {
  const { ready, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router, ready]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-white">
        <div className="w-[240px] h-ful bg-gray-100">
          <Sidebar />
        </div>
        <div className="flex-1 flex-shrink-0 p-4">{children}</div>
      </div>
    </QueryClientProvider>
  );
}
