"use client";

import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { MainNavItem, SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface MobileNavProps {
    mainNavItems?: MainNavItem[];
    sidebarNavItems?: SidebarNavItem[];
}

export function MobileNav({ mainNavItems }: MobileNavProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    aria-label="Toggle Menu"
                    variant="ghost"
                    className="border px-2 text-base text-secondary-foreground hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                >
                    <Icons.menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pl-0 pr-0 lg:hidden">
                <div className="px-7">
                    <Link aria-label="Shop" href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                        <div className="font-bold inline-block text-xl text-gray-700 dark:text-white">
                            <span className="text-blue-800">S</span>hop.
                        </div>
                    </Link>
                </div>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="pl-1 pr-7">
                        <Accordion type="single" collapsible className="w-full">
                            {mainNavItems?.map((item, index) =>
                                item?.items ? (
                                    <AccordionItem value={item.title} key={index}>
                                        <AccordionTrigger className="text-sm capitalize">{item.title}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col space-y-2">
                                                {item.items?.map((subItem, index) =>
                                                    subItem.href ? (
                                                        <MobileLink
                                                            key={index}
                                                            href={String(subItem.href)}
                                                            pathname={pathname}
                                                            setIsOpen={setIsOpen}
                                                            disabled={subItem.disabled}
                                                        >
                                                            {subItem.title}
                                                        </MobileLink>
                                                    ) : (
                                                        <div key={index} className="text-foreground/70 transition-colors">
                                                            {item.title}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ) : (
                                    <div className="text-sm py-4 border-b-[1px]" key={index}>
                                        <SheetTrigger asChild>
                                                <Link
                                                    aria-label={item.title}
                                                    href={String(item.href)}>{item.title}</Link>
                                        </SheetTrigger>
                                    </div>
                                )
                            )}
                        </Accordion>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

interface MobileLinkProps {
    children?: React.ReactNode;
    href: string;
    disabled?: boolean;
    pathname: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({ children, href, disabled, pathname, setIsOpen }: MobileLinkProps) {
    return (
        <Link
            aria-label={pathname}
            href={href}
            className={cn(
                "text-foreground/70 transition-colors hover:text-foreground",
                pathname === href && "text-foreground",
                disabled && "pointer-events-none opacity-60"
            )}
            onClick={() => setIsOpen(false)}
        >
            {children}
        </Link>
    );
}
