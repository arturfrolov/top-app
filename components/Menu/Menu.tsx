import {getMenu} from '@/api/menu';
import {FirstLevelMenuItem} from '@/interfaces/menu.interface';
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

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(menu => (
					<div key={menu.route}>
						<a href={`/${menu.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: menu.id === firstCategory,
							})}>
								{menu.icon}
								<span>
									{menu.name}
								</span>
							</div>
						</a>
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = () => {

	};

	const buildThridLevel = () => {

	};

	try {
		const menu = await getMenu(0);

		return (
			// <ul>
			// 	{menu.map(item => (
			// 		<li key={item._id.secondCategory}>
			// 			<span>{item._id.secondCategory}</span>
			// 		</li>
			// 	))}
			// </ul>

			<div className={styles.menu}>
				{buildFirstLevel()}
			</div>
		);
	} catch (error) {
		console.error('Ошибка загрузки меню:', error);
		return <div>Ошибка загрузки меню</div>;
	}

}
