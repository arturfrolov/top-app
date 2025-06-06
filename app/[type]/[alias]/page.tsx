import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getPage} from '@/api/page';
import {getMenu} from '@/api/menu';
import {getProduct} from '@/api/product';
import {firstLevelMenu} from '@/helpers/helpers';
import {CoursePageComponent} from '@/page-components';


type CourseParams = {
	type: string;
	alias: string;
};

type CourseProps = {
	params: Promise<CourseParams>;
};


export async function generateMetadata({params}: CourseProps): Promise<Metadata> {
	const { alias } = await params;

	const page = await getPage(alias);

	if (!page) {
		return {
			title: 'Страница не найдена',
			description: 'Запрашиваемая страница не существует'
		};
	}

	return {
		title: page.metaTitle,
		description: page.metaDescription || `Курсы по ${page.title}`,
		openGraph: {
			title: page.metaTitle,
			description: page.metaDescription,
			type: 'article',
		}
	};
}

export async function generateStaticParams() {
	const paths: { type: string; alias: string }[] = [];

	for (const firstLevelItem of firstLevelMenu) {
		const menu = await getMenu(firstLevelItem.id);
		for (const menuItem of menu) {
			for (const page of menuItem.pages) {
				paths.push({
					type: firstLevelItem.route,
					alias: page.alias,
				});
			}
		}
	}

	return paths;
}

export default async function CoursePage({params}: CourseProps) {
	const { type, alias } = await params;

	const firstLevelItem = firstLevelMenu.find(item => item.route === type);
	if (!firstLevelItem) {
		notFound();
	}

	const page = await getPage(alias); // Получаем страницу (без отображения карточек курсов).

	if (!page || page.firstCategory !== firstLevelItem.id) {
		notFound();
	}

	const products = await getProduct(page.category); // Получаем все курсы (карточки курсов) с этой старницы.

	return (
		<CoursePageComponent
			page={page}
			products={products}
			firstCategory={firstLevelItem.id}
		/>
	);
}

