"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { Button } from "./ui/button";

export function Hero() {
    const router = useRouter();

    return (
        <div className="hero-section">
            <div className="overlay" />
            <Header
                className="text-center text-white place-items-center"
                title="Welcome to our store"
                description="We sell the best T-shirt, Shoes, ..."
                size="sm"
            />
            <div className="py-4 text-center md:mt-4">
                <div className="flex items-center justify-center gap-x-3">
                    <h1 className="font-medium text-white md:text-lg">Explore our products</h1>
                    <div onClick={() => router.push("/products")}>
                        <Button variant="outline" size="icon" aria-label="Go to products" className="dark:bg-white dark:border-white">
                            <ChevronRight className="w-5 h-5 text-gray-600 " />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
