import { Shell } from "@/components/shell";

export default function HomePage() {
    return (
        <Shell>
            <div className="hero-section text-center py-10">
                <div className="overlay" />
                <div>
                    <h1 className="text-[1.7rem] md:text-[3rem] lg:text-[4rem] font-bold">Welcome to our store</h1>
                    <p className="font-semibold text-[1rem] md:text-[1.7rem] pt-5">We sell the best T-shirt, Shoes, ...</p>
                </div>
            </div>
            <div className="text-2xl font-bold text-gray-700">
                Welcome to <span className="text-blue-800">S</span>hop.
            </div>
        </Shell>
    );
}
