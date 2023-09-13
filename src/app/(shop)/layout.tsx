import { SiteHeader } from "@/components/layouts/site-header";
import React from "react";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="my-5 min-h-[75vh]">{children}</main>
        </div>
    );
}
