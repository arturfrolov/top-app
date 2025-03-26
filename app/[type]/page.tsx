import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMenu } from '@/api/menu';
import { firstLevelMenu } from '@/helpers/helpers';

type TypePageParams = {
	type: string
};

type TypePageProps = {
	params: Promise<TypePageParams>;
};


export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
	const { type } = await params;
	return {
		title: `Раздел: ${type}`,
		description: `Страница раздела: ${type}`
	};
}

export async function generateStaticParams() {
	return firstLevelMenu.map(menuItem => ({ type: menuItem.route }));
}

export default async function TypePage({ params }: TypePageProps) {
	const { type } = await params;

	const firstCategoryItem = firstLevelMenu.find(item => item.route === type);
	if (!firstCategoryItem) {
		notFound();
	}

	const menu = await getMenu(firstCategoryItem.id);

	if (!menu || menu.length === 0) {
		notFound();
	}

	return (
		<div>
			<h1>Раздел: {firstCategoryItem.name}</h1>
			<ul>
				{menu.map((menuItem) => (
					<li key={menuItem._id.secondCategory}>
						<strong>{menuItem._id.secondCategory}</strong>
					</li>
				))}
			</ul>
		</div>
	);
};
