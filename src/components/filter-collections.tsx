"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCollectionsFilters } from "@/services/hooks/use-collections-filter";

export default function FilterCollections() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [collections, setCollections] = React.useState<any[]>([]);

	const { data, isError, isSuccess, isLoading } = useCollectionsFilters();
	// isSuccess && console.log(data.data);

	React.useEffect(() => {
		if (isSuccess) {
			setCollections(data.data);
		}
	}, [isSuccess]);

	// isSuccess && console.log(collections[0].node.title);

	// fill this array with the collections from the api

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
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === collection.value ? "opacity-100" : "opacity-0"
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
