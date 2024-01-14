"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useState } from "react";

function QueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
