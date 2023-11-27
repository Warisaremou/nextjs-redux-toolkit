import Image from "next/image";
import Link from "next/link";
import React from "react";

type CollectionsCardType = {
	collection: any;
	className?: string;
};

export default function CollectionsCard({ className, collection }: CollectionsCardType) {
	// console.log(collection?.node);
	return (
		<Link href="/products" aria-label="" className={`${className}`}>
			<div className="overflow-hidden w-full h-full bg-gray-50 rounded-xl relative">
				<div className="absolute inset-0 z-10 bg-zinc-800/50" />
				<Image
					src={collection?.node?.image?.url}
					alt=""
					priority
					width={300}
					height={300}
					className="scale-100 hover:scale-110 ease-linear duration-100 object-cover h-full w-full"
				/>
				<h1 className="z-50 text-white font-semibold text-4xl lg:text-[45px] top-1/2 absolute w-full flex justify-center">
					{collection?.node?.title}
				</h1>
			</div>
		</Link>
	);
}
