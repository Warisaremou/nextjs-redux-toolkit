import { Hero } from "@/components/hero";
import { Shell } from "@/components/shell";
import CollectionSection from "@/sections/collections-section";

export default function HomePage() {
	return (
		<Shell>
			<Hero />
			<CollectionSection />
		</Shell>
	);
}
