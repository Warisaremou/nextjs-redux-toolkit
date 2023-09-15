"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";
import Link from "next/link";
import * as React from "react";

interface MainNavProps {
    items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
    return (
        <div className="hidden lg:flex gap-x-6 md:gap-44">
            <Link aria-label="Shop" href="/" className="items-center md:space-x-2 hidden lg:flex">
                <div className="font-bold inline-block text-xl text-gray-800 dark:text-white"> <span className="text-blue-700">S</span>hop.</div>
            </Link>
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    {items?.[0]?.items ? (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="h-auto">{items[0].title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                aria-label="Home"
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg text-blue-800 font-bold">{siteConfig.name}</div>
                                                <p className="text-sm leading-tight text-muted-foreground">{siteConfig.description}</p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    {items[0].items.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href}>
                                            {item.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : null}
                    {items
                        ?.filter((item) => item.title !== items[0]?.title)
                        .map((item) =>
                            item?.items ? (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuTrigger className="h-auto capitalize">{item.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {item.items.map((item) => (
                                                <ListItem key={item.title} title={item.title} href={item.href}>
                                                    {item.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ) : (
                                item.href && (
                                    <NavigationMenuItem key={item.title}>
                                            <Link
                                                aria-label={item.title}
                                                href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-auto")}>
                                                {item.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                )
                            )
                        )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        aria-label={title}
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
