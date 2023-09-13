"use client";

// import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { UpdateCart } from "@/components/cart/update-cart";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Redux packages
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromCart, clearCart, clearFromCart, addToCart } from "@/features/cart/cart-slice";
import { formatPrice } from "@/utils";

// import { getCartAction } from "@/app/_actions/cart";

export function CartSheet() {
    const cart = useSelector((state: RootState) => state.cart.cart);

    const dispatch = useDispatch();

    console.log(cart.cart);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button aria-label="Open cart" variant="outline" size="icon" className="relative">
                    {/* {itemCount > 0 && (
                        <Badge variant="secondary" className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2">
                            {itemCount}
                        </Badge>
                    )} */}
                    {cart.cart.length > 0 && (
                        <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full pl-[6px] font-bold">{cart.cart.length}</Badge>
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
                {/* <div className="flex h-full flex-col items-center justify-center space-y-2">
                    <Icons.cart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                    <span className="text-lg font-medium text-muted-foreground">Your Cart is empty !</span>
                </div> */}
                {/* {itemCount > 0 ? (
                    <>
                        <div className="flex flex-1 flex-col gap-5 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="flex flex-col gap-5 pr-6">
                                    {cartLineItems.map((item) => (
                                        <div key={item.id} className="space-y-3">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative h-16 w-16 overflow-hidden rounded">
                                                    {item?.images?.length ? (
                                                        <Image
                                                            src={item.images[0]?.url ?? "/images/product-placeholder.webp"}
                                                            alt={item.images[0]?.name ?? item.name}
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            fill
                                                            className="absolute object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center bg-secondary">
                                                            <Icons.placeholder
                                                                className="h-4 w-4 text-muted-foreground"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                                                    <span className="line-clamp-1">{item.name}</span>
                                                    <span className="line-clamp-1 text-muted-foreground">
                                                        {formatPrice(item.price)} x {item.quantity} ={" "}
                                                        {formatPrice((Number(item.price) * Number(item.quantity)).toFixed(2))}
                                                    </span>
                                                    <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                                                        {`${item.category} ${item.subcategory ? `/ ${item.subcategory}` : ""}`}
                                                    </span>
                                                </div>
                                                <UpdateCart cartLineItem={item} />
                                            </div>
                                            <Separator />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className="grid gap-1.5 pr-6 text-sm">
                            <Separator className="mb-2" />
                            <div className="flex">
                                <span className="flex-1">Subtotal</span>
                                <span>{formatPrice(cartTotal.toFixed(2))}</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Taxes</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <Separator className="mt-2" />
                            <div className="flex">
                                <span className="flex-1">Total</span>
                                <span>{formatPrice(cartTotal.toFixed(2))}</span>
                            </div>
                            <SheetFooter className="mt-1.5">
                                <Button aria-label="Proceed to checkout" size="sm" className="w-full">
                                    Proceed to Checkout
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-2">
                        <Icons.cart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                        <span className="text-lg font-medium text-muted-foreground">Votre Panier est vide !</span>
                    </div>
                )} */}
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
                                                <div className="font-medium text-gray-600">
                                                    {formatPrice(item?.productDetails?.variants?.edges[0]?.node?.price?.amount)} x{" "}
                                                    {item?.quantity} ={" "}
                                                    {formatPrice(
                                                        Number(item?.productDetails?.variants?.edges[0]?.node?.price?.amount) *
                                                            Number(item?.quantity)
                                                    )}
                                                </div>
                                                <div className="flex gap-x-5 mt-2">
                                                    <div className="flex items-center bg-gray-50 border px-2 rounded-md justify-between w-full space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            // disabled={quantity <= 1 && true}
                                                            onClick={() => {
                                                                dispatch(removeFromCart(item?.productDetails));
                                                            }}
                                                        >
                                                            <Icons.remove className="h-5 w-5 text-gray-600" aria-hidden="true" />
                                                        </Button>
                                                        <span className="font-semibold">{item?.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            // disabled={quantity === 10 && true}
                                                            onClick={() => {
                                                                dispatch(addToCart(item?.productDetails));
                                                            }}
                                                        >
                                                            <Icons.add className="h-5 w-5 text-gray-600" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        // disabled={quantity <= 1 && true}
                                                        onClick={() => {
                                                            dispatch(clearFromCart(item?.productDetails));
                                                        }}
                                                        className="rounded-lg border px-[10px]"
                                                    >
                                                        <Icons.trash className="h-5 w-5 text-gray-600" aria-hidden="true" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <div className=" mr-6">
                            <SheetFooter className="mt-1.5">
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
