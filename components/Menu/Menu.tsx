import {getMenu} from '@/api/menu';
import {FirstLevelMenuItem, MenuItem, PageItem} from '@/interfaces/menu.interface';
import {TopLevelCategory} from '@/interfaces/page.interface';
import styles from './Menu.module.css';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import BooksIcon from './icons/books.svg';
import cn from 'classnames';


const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon/>,
		id: TopLevelCategory.Courses
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon/>,
		id: TopLevelCategory.Services
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon/>,
		id: TopLevelCategory.Books
	},
	{
		route: 'products',
		name: 'Товары',
		icon: <ProductsIcon/>,
		id: TopLevelCategory.Products
	},
];

export default async function Menu() {

	const firstCategory = TopLevelCategory.Courses;

	const buildFirstLevel = (menu: MenuItem[]) => {
		return (
			<>
				{firstLevelMenu.map(firstLevelMenuItem => (
					<div key={firstLevelMenuItem.route}>
						<a href={`/${firstLevelMenuItem.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: firstLevelMenuItem.id === firstCategory,
							})}>
								{firstLevelMenuItem.icon}
								<span>
										{firstLevelMenuItem.name}
									</span>
							</div>
						</a>

						{firstLevelMenuItem.id === firstCategory && buildSecondLevel(menu, firstLevelMenuItem)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menu: MenuItem[], firstLevelMenuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondLevelBlock}>
				{menu.map(menuItem => (
					<div key={menuItem._id.secondCategory}>
						<div className={styles.secondLevel}>
							{menuItem._id.secondCategory}
						</div>

						<div className={cn(styles.thirdLevelBlock, {
							[styles.thirdLevelBlockOpened]: menuItem.isOpened,
						})}>
							{buildThirdLevel(menuItem.pages, firstLevelMenuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string ) => {
		return (
			pages.map(page => (
				<a
					href={`/${route}/${page.alias}`}
					key={page._id}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: false,
					})}
				>
					{page.category}
				</a>
			))
		);
	};

	try {
		const menu = await getMenu(firstCategory);

		return (
			<div className={styles.menu}>
				{buildFirstLevel(menu)}
			</div>
		);
	} catch (error) {
		console.error('Ошибка загрузки меню:', error);
		return <div>Ошибка загрузки меню</div>;
	}

}
