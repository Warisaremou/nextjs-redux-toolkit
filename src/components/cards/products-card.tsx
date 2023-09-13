"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProductIdProvider } from "@/context/product-id-provider";
import { formatPrice } from "@/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductsCardProps {
    product?: any;
}

export default function ProductsCard({ product }: ProductsCardProps) {
    const { setProductId, productId } = useProductIdProvider();
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    const router = useRouter();
    // console.log(product?.node?.id);

    const productTitle: string = product?.node?.title;

    const handleProductId = async (id: string) => {
        await setProductId(id);
        // console.log(productId)
        // console.log(id);
        router.push(`/products/${productTitle.toLocaleLowerCase().replace(" ", "-")}`);
    };

    return (
        <div className="border rounded-2xl">
            <div className="overflow-hidden w-full h-fit bg-gray-50 rounded-t-2xl">
                <div onClick={() => handleProductId(product?.node?.id)} className="cursor-pointer">
                    <Image
                        src={product?.node?.featuredImage?.url}
                        alt="Nike Shoe"
                        width={300}
                        height={300}
                        priority
                        className="scale-100 hover:scale-110 ease-linear duration-100 object-cover h-full w-full"
                    />
                </div>
            </div>
            <div className="p-3 space-y-3">
                <div className="font-semibold">
                    <h1 className="text-xl text-gray-700 pb-1"> {product?.node?.title} </h1>
                    <div className="flex space-x-4 items-center">
                        <h3 className="text-gray-600">{formatPrice(product?.node?.variants?.edges[0]?.node?.price?.amount)}</h3>
                        <h3 className="text-gray-800">{product?.node?.variants?.edges[0]?.node?.price?.currencyCode}</h3>
                    </div>
                </div>
                <Button
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold"
                    disabled={isPending}
                    onClick={() => {
                        startTransition(() => {
                            toast({
                                title: "Added to cart successfully !",
                            });
                        });
                    }}
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Add to cart
                </Button>
            </div>
        </div>
    );
}
