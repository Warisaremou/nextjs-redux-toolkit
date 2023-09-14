"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { addToCart } from "@/features/cart/cart-slice";
import { useDispatch } from "react-redux";
import { ProductType } from "@/types";

type AddToCartProps = {
    product: ProductType;
};

export default function AddToCart({ product }: AddToCartProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isPending, startTransition] = React.useTransition();

    return (
        <div className="flex flex-col md:flex-row gap-x-16 gap-y-5 mt-5">
            <div className="flex items-center bg-gray-100 dark:bg-background dark:border-white border p-2 rounded-md justify-between w-full md:w-2/4">
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={quantity <= 1 && true}
                    onClick={() => setQuantity(quantity - 1)}
                    className="rounded-full"
                >
                    <Icons.remove className="h-5 w-5 text-gray-600 dark:text-white" aria-hidden="true" />
                </Button>
                <span className="font-semibold"> {quantity} </span>
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={quantity === 10 && true}
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full"
                >
                    <Icons.add className="h-5 w-5 text-gray-600 dark:text-white" aria-hidden="true" />
                </Button>
            </div>
            <Button
                aria-label="Add to cart"
                className="p-7 rounded-md w-full md:w-2/4 bg-blue-800 hover:bg-blue-900 text-white font-semibold"
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => {
                        try {
                            await dispatch(addToCart({product, quantity}));
                            toast({
                                title: "Added to cart successfully",
                                action: (
                                    <ToastAction
                                        className="bg-blue-800 text-white hover:bg-blue-900 hover:text-white rounded-md"
                                        altText="View Cart"
                                        onClick={() => router.push("/cart")}
                                    >
                                        View cart
                                    </ToastAction>
                                ),
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    });
                }}
            >
                {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}Add to cart
            </Button>
        </div>
    );
}
