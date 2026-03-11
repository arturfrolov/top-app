import {API} from '@/app/api';
import {MenuItem} from '@/interfaces/menu.interface';

export async function getMenu(firstCategory: number): Promise<MenuItem[]> {
	try {
		const response = await fetch(API.topPage.find, {
			method: 'POST',
			body: JSON.stringify({firstCategory}),
			headers: new Headers({ 'Content-Type': 'application/json' }),
			next: {
				tags: ['menu', `menu-category-${firstCategory}`],
				revalidate: 3600,
			}
		});

		if (!response.ok) {
			console.error(`Failed to fetch menu for category ${firstCategory}: ${response.status}`);
			return [];
		}

		return response.json();
	} catch (err) {
		console.error(`Network error fetching menu for category ${firstCategory}:`, err);
		return [];
	}
}
