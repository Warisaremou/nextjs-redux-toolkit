"use client";

import CollectionsCard from "@/components/cards/collections-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCollections } from "@/services/hooks/use-collections";

export default function CollectionSection() {
	const { data, isError, isSuccess, isLoading } = useCollections();
	// isSuccess ? console.log(data.data) : console.log("Error while fetching collections");

	return (
		<div id="collections">
			<div className="text-center space-y-1 mb-10">
				<h1 className="text-4xl font-bold text-blue-800">Discover Our Collection</h1>
				<p className="text-xl font-medium text-gray-500 dark:text-gray-300">
					Find the best Clothes from store around the world
				</p>
			</div>
			{isLoading && (
				<div className="grid md:grid-cols-2 gap-8">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton
							key={i}
							className={cn(
								"rounded-2xl w-full",
								i == 0 ? "row-span-2 h-80 md:h-full" : "h-80 xl:h-96"
							)}
						/>
					))}
				</div>
			)}
			{isSuccess && (
				<div className="grid md:grid-cols-2 gap-8">
					{data?.data.map((collection: any, index: number) => (
						<CollectionsCard
							key={collection.node.id}
							collection={collection}
							className={`${index == 0 && "row-span-2"}`}
						/>
					))}
				</div>
			)}

			{isError && <h1 className="text-destructive text-lg font-semibold">Something went wrong !</h1>}
		</div>
	);
}
