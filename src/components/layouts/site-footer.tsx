import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "../theme-toogle";

export function SiteFooter() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex flex-row items-center justify-between space-y-1 py-5 md:h-16 md:flex-row md:py-0">
                <div className="font-bold inline-block text-xl text-gray-700 dark:text-white">
                    <span className="text-blue-800">S</span>hop.
                </div>
                <div className="flex items-center space-x-1">
                    <Link href="https://github.com/Warisaremou" target="_blank" rel="noreferrer">
                        <div
                            className={cn(
                                buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })
                            )}
                        >
                            <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
}
