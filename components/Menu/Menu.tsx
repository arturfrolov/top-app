import {getMenu} from '@/api/menu';

export default async function Menu() {

	try {
		const menu = await getMenu(0);

		return (
			<ul>
				{menu.map(item => (
					<li key={item._id.secondCategory}>
						<span>{item._id.secondCategory}</span>
					</li>
				))}
			</ul>
		);
	} catch (error) {
		console.error('Ошибка загрузки меню:', error);
		return <div>Ошибка загрузки меню</div>;
	}

}
