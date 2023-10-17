import ProductDetails from "./product-details";

interface ProductDetailPageProps {
	params: {
		productId: string;
	};
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
	return {
		title: `${params.productId.charAt(0).toUpperCase() + params.productId.slice(1)} - Shop.`,
		description: `Product details for ${params.productId}.`,
	};
}

export default function ProductDetailPage() {
	return <ProductDetails />;
}
