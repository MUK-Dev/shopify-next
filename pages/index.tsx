import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero, Marquee } from "@components/ui";

export const getStaticProps = async () => {
	const config = getConfig();
	const products = await getAllProducts(config);

	return {
		props: {
			products,
		},
		revalidate: 4 * 60 * 60,
	};
};

export default function Home({
	products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Grid layout="A">
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<Hero
				headline="Cookies, ice cream and muffins"
				description="Gingerbread donut wafer cupcake bonbon shortbread gingerbread chupa chups. Sweet roll sesame snaps candy jelly beans fruitcake pudding gummies pie cake. Dessert tiramisu candy canes lollipop sesame snaps candy bear claw. Liquorice cake cake carrot cake pudding. Liquorice donut tootsie roll gummies chocolate bar jelly beans. Pastry soufflé soufflé chocolate wafer sweet roll jujubes chocolate bar gummies. Cupcake fruitcake macaroon chocolate cake marzipan carrot cake cake. Jujubes cake tart marzipan toffee sesame snaps cake chocolate candy. Gummies gingerbread tootsie roll tart powder dessert oat cake."
			/>
			<Marquee>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
			<Grid layout="B">
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<Marquee variant="secondary">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
		</>
	);
}

Home.Layout = Layout;
