"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Confirmation from "./components/Confirmation"

const queryClient = new QueryClient()

export default function Page() {
    return (
      <QueryClientProvider client={queryClient}>
        <Confirmation />
      </QueryClientProvider>
    )
};

