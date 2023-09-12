import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shop",
    description: "Only shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={urbanist.className}>{children}</body>
        </html>
    );
}
