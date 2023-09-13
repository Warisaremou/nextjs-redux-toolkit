import "./globals.css";

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import TanStackQueryProvider from "@/components/query-client-provider";
import { ProductIdContextProvider } from "@/context/product-id-provider";
import StoreProvider from "@/store/store-provider";

const urbanist = Urbanist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shop.",
    description: "Only shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={urbanist.className}>
                <StoreProvider>
                    <TanStackQueryProvider>
                        <ProductIdContextProvider>
                            {children}
                            <Toaster />
                        </ProductIdContextProvider>
                    </TanStackQueryProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
