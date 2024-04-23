"use client";

import { AuthProvider } from "@/auth/AwsCognitoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </>
  );
}
