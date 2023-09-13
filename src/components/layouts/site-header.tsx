"use client";

import { MainNav } from "@/components/layouts/main-nav";
import { siteConfig } from "@/config/site";
import { CartSheet } from "../cart/cart-sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileNav } from "./mobile-nav";
import { useRouter } from "next/navigation";

export function SiteHeader() {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex items-center h-16">
                <MobileNav mainNavItems={siteConfig.mainNav} />
                <MainNav items={siteConfig.mainNav} />
                <div className="flex flex-1 justify-end items-center space-x-4">
                    <nav className="flex items-center space-x-4">
                        <CartSheet />
                        <Avatar className="cursor-pointer" onClick={() => router.push("https://github.com/Warisaremou")} >
                            <AvatarImage src="https://github.com/Warisaremou.png" alt="@warisaremou" />
                            <AvatarFallback>WA</AvatarFallback>
                        </Avatar>
                    </nav>
                </div>
            </div>
        </header>
    );
}
