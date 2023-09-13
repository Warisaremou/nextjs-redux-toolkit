import { Shell } from "@/components/shell";
import React from "react";

export default function HomePage() {
    return (
        <Shell>
            <div className="text-2xl font-bold text-gray-700">
                Welcome to <span className="text-blue-800">S</span>hop.
            </div>
            <div className="hero-section text-center text-muted py-10">
                <div>
                    <h1 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] font-bold">Welcome to our store</h1>
                </div>
                <p className="font-medium text-[1rem] md:text-[1.5rem] pt-5">We sell the best T-shirt, Shoes, ...</p>
            </div>
        </Shell>
    );
}
