"use client";

import CollectionsCard from "@/components/cards/collections-card";
import { useCollections } from "@/services/hooks/use-collections";

export default function CollectionSection() {
	const { data, isError, isSuccess, isLoading } = useCollections();

	isSuccess ? console.log(data.data) : console.log("Error while fetching collections");

	return (
		<div id="collections">
			<div className="text-center space-y-1">
				<h1 className="text-4xl font-bold text-blue-800">Discover Our Collection</h1>
				<p className="text-xl font-medium text-gray-500 dark:text-gray-300">
					Find the best Clothes from store around the world
				</p>
			</div>
			<div className="py-5 grid md:grid-cols-2 gap-8">
				{/* <CollectionsCard className="row-span-2" />
				<CollectionsCard className="" />
				<CollectionsCard className="" /> */}
				{data?.data.map((collection: any, index: number) => (
					<CollectionsCard
						key={collection.node.id}
						collection={collection}
						className={`${index == 0 && "row-span-2"}`}
					/>
				))}
			</div>
		</div>
	);
}
