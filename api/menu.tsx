import {API} from '@/app/api';
import {MenuItem} from '@/interfaces/menu.interface';

export async function getMenu(firstCategory: number): Promise<MenuItem[]> {
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
		throw new Error('Failed to fetch menu');
	}

	return response.json();
}
