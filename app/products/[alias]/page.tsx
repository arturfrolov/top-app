import {Metadata} from 'next';
import {getPage} from '@/api/page';
import {notFound} from 'next/navigation';
import {getMenu} from '@/api/menu';


type PageProps = {
	params: { alias: string }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
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
		description: page.seo?.description || `Страница о ${page.title}`
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

export default async function PageProducts({params}: PageProps) {
	const { alias } = await params;
	const page = await getPage(alias);

	if (!page) {
		notFound();
	}

	return (
			<div>
				{page.title}
			</div>
		);
}

