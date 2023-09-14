import { Hero } from "@/components/hero";
import { Shell } from "@/components/shell";

export default function HomePage() {
    return (
        <Shell>
            <Hero />
            <div className="text-2xl font-bold text-gray-700 dark:text-white">
                Welcome to <span className="text-blue-800">S</span>hop.
            </div>
        </Shell>
    );
}

