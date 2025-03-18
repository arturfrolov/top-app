import {Metadata} from 'next';
import {getProduct} from '@/api/product';
import {notFound} from 'next/navigation';
import {getPage} from '@/api/page';
import {getMenu} from '@/api/menu';


type CourseProps = {
	params: { alias: string }
}

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
		title: page.title,
		description: page.seoText || `Курсы по ${page.title}`
	};
}

export async function generateStaticParams() {
	try {
		const menu = await getMenu(0);

		return menu.flatMap(item =>
			item.pages.map((page: { alias: string }) => ({
				alias: page.alias,
			}))
		);

	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

export default async function CoursePage({params}: CourseProps) {
	const { alias } = await params;
	const page = await getPage(alias); // Получаем страницу (без отображения карточек курсов).

	if (!page) {
		notFound();
	}

	const products = await getProduct(page.category); // Получаем все курсы (карточки курсов) с этой старницы.

	return (
		<div>
			<ul>
				{products.map(product => (
					<li key={product._id}>
						<span>{product.title}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

