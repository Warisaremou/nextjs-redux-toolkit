export function formatPrice(
    price: number | string,
    currency: "USD" | "EUR" | "GBP" | "BDT" = "USD",
    notation: "compact" | "engineering" | "scientific" | "standard" = "standard"
) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        notation,
    }).format(Number(price));
}
