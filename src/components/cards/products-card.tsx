"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useProductIdProvider } from "@/context/product-id-provider";
import { formatPrice } from "@/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cart-slice";
import { ProductType } from "@/types";

interface ProductsCardProps {
    product?: any;
}

export default function ProductsCard({ product }: ProductsCardProps) {
    const { setProductId, productId } = useProductIdProvider();
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();

    // const [productDetails, setProductDetails] = React.useState<ProductType>({} as ProductType);

    const productTitle: string = product?.node?.title;

    // console.log(productDetails);

    // console.log(product?.node);

    const handleProductId = async (id: string) => {
        await setProductId(id);
        router.push(`/products/${productTitle.toLocaleLowerCase().replace(" ", "-")}`);
    };

    // React.useEffect(() => {
    //     console.log(productDetails);
    // }, [productDetails]);

    return (
        <div className="border rounded-2xl">
            <div className="overflow-hidden w-full h-fit bg-gray-50 rounded-t-2xl">
                <div onClick={() => handleProductId(product?.node?.id)} className="cursor-pointer">
                    <Image
                        src={product?.node?.featuredImage?.url}
                        alt={`${product?.node?.title}-image`}
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
                        startTransition(async () => {
                            // dispatch(addToCart(product?.node?.variants?.edges[0]?.node?.id))
                            // await setProductDetails({
                            //     id: product?.node?.id,
                            //     name: product?.node?.title,
                            //     price: product?.node?.variants?.edges[0]?.node?.price?.amount,
                            //     image: product?.node?.featuredImage?.url,
                            // });
                            try {
                                await dispatch(addToCart(product?.node));
                                toast({
                                    title: "Added to cart successfully !",
                                });
                            } catch (error) {
                                console.log(error);
                            }
                            // console.log(productDetails);
                            // await dispatch(addToCart(product?.node))
                            // if (productDetails.id) {
                            //     await dispatch(addToCart(productDetails));
                            //     toast({
                            //         title: "Added to cart successfully !",
                            //     });
                            // } else {
                            //     console.log("Something went wrong !");
                            // }
                        });
                    }}
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Add to cart
                </Button>
            </div>
        </div>
    );
}
