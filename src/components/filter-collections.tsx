"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCollectionsFilters } from "@/services/hooks/use-collections-filter";
import { getCollection } from "@/services/hooks/get-collection";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterCollectionsProps {
	setCollectionProducts: any;
	setIsLoading: any;
}

export default function FilterCollections({ setCollectionProducts, setIsLoading }: FilterCollectionsProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<string>("");
	const [collectionID, setCollectionId] = React.useState<string>("");
	const [collections, setCollections] = React.useState<any[]>([]);
	const [clearFilter, setClearFilter] = React.useState<boolean>(false);

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const collection_range = searchParams.get("collection") ?? "";
	const params = new URLSearchParams(searchParams?.toString());

	const { data, isSuccess } = useCollectionsFilters();
	React.useEffect(() => {
		//Update the URL with the collection name
		// console.log("collection_range =>", collection_range);
		// ** Function to fetch the collection data by collection name
		async function fecthCollection(collection: string) {
			const collection_id = await data?.data.find(
				(collectionData: any) => collectionData.node.handle === collection
			)?.node.id;
			// console.log("collection_id =>", collection_id);
			setCollectionId(collection_id);
		}

		if (value !== "") {
			// console.log("value =>", value);
			params.set("collection", value);
		} else {
			params.delete("collection");
		}
		// else {
		// 	// console.log("value is null");
		// 	collection_range == ""
		// 		? console.log("collection_range is null")
		// 		: console.log("collection_range =>", collection_range);
		// }
		if (collection_range !== "") {
			setValue(collection_range);
			params.set("collection", value);
			fecthCollection(collection_range);
		} else {
			params.delete("collection");
		}

		router.replace(`${pathname}?${params.toString()}`);

		if (isSuccess) {
			setCollections(data.data);
		}
		if (collectionID !== "") {
			setIsLoading(true);
			getCollection(collectionID)
				.then((res) => {
					// console.log(res.data.data.collection.products.edges);
					setCollectionProducts(res.data.data.collection.products.edges);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [isSuccess, data, collectionID, value, collection_range]);

	return (
		<div className="flex items-center space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] md:w-[220px] justify-between"
					>
						{value
							? collections.find((collection: any) => collection.node.handle === value)?.node.title
							: "Filter By Collection..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search collection..." />
						<CommandEmpty>No collection found.</CommandEmpty>
						<CommandGroup>
							{collections.map((collection: any) => (
								<CommandItem
									key={collection.node.title}
									onSelect={(currentValue) => {
										// console.log("currentValue =>", currentValue);
										setValue(currentValue === value ? value : currentValue);
										setOpen(false);
										setCollectionId(collection.node.id);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === collection.node.handle ? "opacity-100" : "opacity-0"
										)}
									/>
									{collection.node.title}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Button
				aria-label="Clear Filter"
				className="bg-blue-800 hover:bg-blue-900 text-white font-semibold"
				onClick={() => {
					setValue("");
					setCollectionId("");
					setCollectionProducts([]);
					setClearFilter(true);
					router.push(`${pathname}?`);
				}}
			>
				Clear Filter
			</Button>
		</div>
	);
}
