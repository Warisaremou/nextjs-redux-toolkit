import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="my-5 min-h-[75vh]">{children}</main>
            <SiteFooter />
        </div>
    );
}
