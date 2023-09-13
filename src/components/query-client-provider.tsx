"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export default function TanStackQueryProvider({ children }: { children?: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 60 * 60 * 7,
                networkMode: "always",
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    );
}
