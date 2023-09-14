"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatPrice } from "@/utils";
import Image from "next/image";
// Redux packages
import { addToCart, clearCart, clearFromCart, removeFromCart } from "@/features/cart/cart-slice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export function CartSheet() {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const dispatch = useDispatch();
    const router = useRouter();
    // console.log(cart.cart);

    // Cart Total
    const cartTotal = cart.cart.reduce((total, item) => {
        return total + Number(item?.productDetails?.variants?.edges[0]?.node?.price?.amount) * Number(item?.quantity);
    }, 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button aria-label="Open cart" variant="outline" size="icon" className="relative">
                    {cart.cart.length > 0 && (
                        <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full pl-[6px] font-bold bg-blue-800 dark:text-white">
                            {cart.cart.length}
                        </Badge>
                    )}
                    <Icons.cart className="h-4 w-4" aria-hidden="true" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-1">
                    <SheetTitle>
                        Cart
                        {cart.cart.length > 0 && `(${cart.cart.length})`}
                    </SheetTitle>
                </SheetHeader>
                <Separator />
                {cart.cart.length > 0 ? (
                    <>
                        <div className="flex flex-1 flex-col gap-5 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="flex flex-col gap-y-5 mr-6">
                                    {cart.cart.map((item) => (
                                        <div
                                            className="flex space-x-3 md:space-x-5 border-b-[1px] pb-5"
                                            key={`${item?.productDetails?.id}`}
                                        >
                                            <div className="overflow-hidden w-24 md:w-28 min-h-full bg-gray-100 rounded-lg">
                                                <Image
                                                    src={item?.productDetails?.featuredImage?.url}
                                                    alt={`${item?.productDetails?.title}-image`}
                                                    height={200}
                                                    width={200}
                                                    className="object-cover h-full w-full"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="font-semibold"> {item?.productDetails?.title} </h2>
                                                <div className="font-medium text-gray-600 dark:text-white">
                                                    {formatPrice(item?.productDetails?.variants?.edges[0]?.node?.price?.amount)} x{" "}
                                                    {item?.quantity} ={" "}
                                                    {formatPrice(
                                                        Number(item?.productDetails?.variants?.edges[0]?.node?.price?.amount) *
                                                            Number(item?.quantity)
                                                    )}
                                                </div>
                                                <div className="flex gap-x-5 mt-2">
                                                    <div className="flex items-center bg-gray-50 dark:bg-background dark:border-white border px-2 rounded-md justify-between w-full space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            // disabled={quantity <= 1 && true}
                                                            onClick={() => {
                                                                dispatch(removeFromCart(item?.productDetails));
                                                            }}
                                                            className="dark:hover:bg-background"
                                                        >
                                                            <Icons.remove className="h-5 w-5 text-gray-600 dark:text-white" aria-hidden="true" />
                                                        </Button>
                                                        <span className="font-semibold dark:text-white">{item?.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            // disabled={quantity === 10 && true}
                                                            onClick={() => {
                                                                dispatch(addToCart({ product: item?.productDetails }));
                                                            }}
                                                            className="dark:hover:bg-background"
                                                        >
                                                            <Icons.add className="h-5 w-5 text-gray-600 dark:text-white" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        // disabled={quantity <= 1 && true}
                                                        onClick={() => {
                                                            dispatch(clearFromCart(item?.productDetails));
                                                        }}
                                                        className="rounded-lg border px-[10px] dark:border-white"
                                                    >
                                                        <Icons.trash className="h-5 w-5 text-gray-600 dark:text-white" aria-hidden="true" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className=" mr-6">
                            <Separator className="mb-2" />
                            <div>
                                <div className="flex py-3">
                                    <span className="flex-1 font-medium text-blue-900">Subtotal</span>
                                    <span className="font-medium dark:text-white"> {formatPrice(cartTotal)} </span>
                                </div>
                                <p className="text-gray-600 text-[14px] md:text-base dark:text-white">
                                    Shipping and taxes will be calculated at checkout.
                                </p>
                            </div>
                            <SheetFooter className="pt-8 gap-3">
                                <Button
                                    aria-label="Clear cart"
                                    size="sm"
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold"
                                    onClick={() => {
                                        dispatch(clearCart());
                                    }}
                                >
                                    Clear Cart
                                </Button>
                                <Button
                                    aria-label="Clear cart"
                                    size="sm"
                                    className="w-full border bg-muted border-blue-800 hover:bg-blue-200 text-blue-800 dark:text-white dark:hover:bg-blue-800 font-semibold"
                                    onClick={() => {
                                        router.push("/cart");
                                    }}
                                >
                                    Go to checkout
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-2">
                        <Icons.cart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                        <span className="text-lg font-medium text-muted-foreground">Your Cart is empty !</span>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
