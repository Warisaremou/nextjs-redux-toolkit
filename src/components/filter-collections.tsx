"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCollectionsFilters } from "@/services/hooks/use-collections-filter";
import { getCollection } from "@/services/hooks/get-collection";

interface FilterCollectionsProps {
	setCollectionProducts: any;
	setIsLoading: any;
}

export default function FilterCollections({ setCollectionProducts, setIsLoading }: FilterCollectionsProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [value, setValue] = React.useState<string>("");
	const [collectionID, setCollectionId] = React.useState<string>("");
	const [collections, setCollections] = React.useState<any[]>([]);

	const { data, isError, isSuccess, isLoading } = useCollectionsFilters();
	// isSuccess && console.log(data.data);
	React.useEffect(() => {
		if (isSuccess) {
			setCollections(data.data);
		}
		if (collectionID !== "") {
			setIsLoading(true);
			getCollection(collectionID)
				.then((res) => {
					console.log(res.data.data.collection.products.edges);
					setCollectionProducts(res.data.data.collection.products.edges);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [isSuccess, data, collectionID]);

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{value
							? collections.find((collection: any) => collection.node.handle === value)?.node
									.title
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
										console.log(collection.node.id);
										setCollectionId(collection.node.id);
										// useCollection(collection.node.id);
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
		</>
	);
}
