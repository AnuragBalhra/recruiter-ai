"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import ToastProvider from "./ToastProvider";
import { SidebarProvider } from "@/components/ui/sidebar"

function Provider({children}: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <ToastProvider />
            <SidebarProvider defaultOpen={true}>
                {children}
            </SidebarProvider>
        </QueryClientProvider>

    );
}

export default Provider;