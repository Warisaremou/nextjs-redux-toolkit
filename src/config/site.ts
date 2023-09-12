import { MainNavItem } from "@/types";

export type SiteConfig = typeof siteConfig;

const links = {
    facebook: "facebook url here",
    instagram: "instagram url here",
    tiktok: "tiktok url here",
};

export const siteConfig = {
    name: "Shop.",
    description: "Your shop is there",
    url: "website url here",
    ogImage: "og image url here",
    mainNav: [
        {
            title: "Shop",
            items: [
                {
                    title: "Our Store",
                    href: "/products",
                    description: "All of our products in one place.",
                    items: [],
                },
                {
                    title: "Services",
                    href: "/",
                    description: "Why choose us?",
                    items: [],
                },
                {
                    title: "Collections",
                    href: "/",
                    description: "Discover our collection of products.",
                    items: [],
                },
            ],
        },
        {
            title: "Store",
            href: "/products",
        },
        {
            title: "Contact Us",
            href: "/",
        },
    ] satisfies MainNavItem[],
    links,
};
