"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getCollection } from "@/services/hooks/get-collection";
import { useCollectionsFilters } from "@/services/hooks/use-collections-filter";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

interface FilterCollectionsProps {
	setCollectionProducts: any;
	setIsLoading: any;
}

export default function FilterCollections({ setCollectionProducts, setIsLoading }: FilterCollectionsProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<string>("");
	const [collectionID, setCollectionId] = React.useState<string>("");
	const [collections, setCollections] = React.useState<any[]>([]);

	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const collection_range = searchParams.get("collection") ?? "";
	const params = new URLSearchParams(searchParams);

	const { data, isSuccess } = useCollectionsFilters();

	React.useEffect(() => {
		if (isSuccess) {
			setCollections(data.data);
		}

		// ** Function to get collection ID by his name
		async function getCollectionID(collection_name: string) {
			const id: string = await data?.data.find(
				(collectionData: any) => collectionData.node.handle === collection_name
			)?.node.id;

			if (id) {
				setCollectionId(id);
			}
		}

		// ** Function to fetch collection products by collectionID
		async function getCollectionProducts(collection_id: string) {
			setIsLoading(true);
			await getCollection(collection_id)
				.then((res) => {
					setCollectionProducts(res.data.data.collection.products.edges);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}

		if (collection_range !== "") {
			setValue(collection_range);
			getCollectionID(collection_range);
			getCollectionProducts(collectionID);
		} else {
			if (collectionID) {
				params.set("collection", value);
				router.replace(`${pathname}?${params.toString()}`);
				getCollectionProducts(collectionID);
			} else {
				params.delete("collection");
			}
			router.replace(`${pathname}?${params.toString()}`);
		}
	}, [isSuccess, data, collectionID, value]);

	return (
		<div className="flex items-center space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
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
										setValue(currentValue === value ? "" : currentValue);
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
					setCollectionId("");
					setValue("");
					setCollectionProducts([]);
					router.replace(`${pathname}`);
				}}
			>
				Clear Filter
			</Button>
		</div>
	);
}
