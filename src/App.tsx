import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StartupLoading from "@/components/StartupLoading";
import { router } from "@/routes";

const queryClient = new QueryClient();

export default function App() {
  const [isStarting, setIsStarting] = useState(true);

  useEffect(() => {
    const startupTimer = window.setTimeout(() => setIsStarting(false), 3000);
    return () => window.clearTimeout(startupTimer);
  }, []);

  if (isStarting) {
    return <StartupLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
