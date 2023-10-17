import type { Metadata } from "next";

import Products from "@/components/products";

export const metadata: Metadata = {
	title: "Our Products - Shop.",
	description: "Online shop products",
};
export default function ProductsPage() {
	return (
		<div>
			<h1 className="text-2xl font-semibold text-gray-700 dark:text-white">Discover our products</h1>
			<Products />
		</div>
	);
}
