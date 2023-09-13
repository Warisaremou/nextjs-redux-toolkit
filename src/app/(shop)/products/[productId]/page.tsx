"use client";

import AddToCart from "@/components/add-to-cart";
import { formatPrice } from "@/utils";
import Image from "next/image";
import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useProduct } from "@/services/hooks/use-product";
import { useProductIdProvider } from "@/context/product-id-provider";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

interface ProductDetailPageProps {
    params: {
        productId: string;
    };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { productId } = useProductIdProvider();
    const { data, isLoading, isError, isSuccess } = useProduct(productId);
    const router = useRouter();

    React.useEffect(() => {
        // console.log(productId);
        isError && router.push("/products");
        isError && console.log("Something went wrong !");
    }, [productId]);

    console.log(productId);

    // isSuccess && console.log(data?.data?.product);

    return (
        <div>
            <Link href="/products" className="flex items-center space-x-1 pb-2">
                <ChevronLeft className="h-4 w-4 text-gray-600" />
                <span className="text-lg font-medium text-gray-600">Back to store</span>
            </Link>

            {isLoading && (
                <div className="grid md:grid-cols-2 py-5 md:gap-x-5 lg:gap-x-10 xl:gap-x-16">
                    <Skeleton className="overflow-hidden w-full h-72 md:h-full bg-gray-100 flex justify-center items-center">
                        <Icons.placeholder className="h-16 w-16 text-gray-400" aria-hidden="true" />
                    </Skeleton>
                    <div className="pt-8 md:pt-0 space-y-5">
                        <Skeleton className="h-12 w-[300px]" />
                        <div className="flex space-x-4 items-center">
                            <Skeleton className="h-12 w-[80px]" />
                            <Skeleton className="h-12 w-[80px]" />
                        </div>
                        <Skeleton className="h-32 w-full" />
                        <div className="flex flex-col md:flex-row gap-x-16 gap-y-5 mt-8">
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </div>
                </div>
            )}

            {isSuccess && (
                <div className="grid md:grid-cols-2 py-5 md:gap-x-5 lg:gap-x-10 xl:gap-x-16">
                    <div className="overflow-hidden w-full h-fit bg-gray-100 rounded-2xl">
                        <Image
                            src={data?.data?.product?.featuredImage?.url}
                            alt="Nike Shoe"
                            width={400}
                            height={400}
                            priority
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="pt-8 md:pt-0 space-y-5">
                        <h2 className="text-2xl lg:text-3xl font-bold"> {data?.data?.product?.title} </h2>
                        <div className="flex space-x-4 items-center">
                            <p className="bg-blue-100 w-fit p-2 rounded-md text-green font-bold text-xl text-blue-800">
                                {formatPrice(data?.data?.product?.variants?.edges[0]?.node?.price?.amount)}
                            </p>
                            <p className="bg-green-100 w-fit p-2 rounded-md text-green font-bold text-xl text-green-800">
                                {data?.data?.product?.variants?.edges[0]?.node?.price?.currencyCode}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-lg md:text-2xl font-bold">Description</h2>
                            <p className="text-justify">{data?.data?.product?.description}</p>
                        </div>
                        <AddToCart productId={params.productId} />
                    </div>
                </div>
            )}
        </div>
    );
}