"use client";

import { useProducts } from "@/services/hooks/use-products";
import ProductsCard from "./cards/products-card";
import { Skeleton } from "./ui/skeleton";
import { Icons } from "./icons";

export default function Products() {
    const { data, isError, isSuccess, isLoading } = useProducts();
    
    return (
        <div className="py-10">
            {isLoading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-2xl border-2">
                            <Skeleton className="overflow-hidden w-full h-56 md:h-48 lg:h-72 bg-gray-50 flex justify-center items-center">
                                <Icons.placeholder className="h-16 w-16 text-gray-400" aria-hidden="true" />
                            </Skeleton>

                            <div className="p-3 space-y-3">
                                <Skeleton className="h-6 w-[200px]" />
                                <div className="flex space-x-4 items-center">
                                    <Skeleton className="h-6 w-[80px]" />
                                    <Skeleton className="h-6 w-[50px]" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isSuccess && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data?.data.map((product: any) => (
                        <ProductsCard key={product.node.id} product={product} />
                    ))}
                </div>
            )}
            {isError && <h1 className="text-destructive text-lg font-semibold">Something went wrong !</h1>}
        </div>
    );
}
