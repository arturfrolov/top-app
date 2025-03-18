import {API} from '@/app/api';
import {ProductModel} from '@/interfaces/product.interface';

export async function getProduct(category: string): Promise<ProductModel[]> {
	try {
		const response = await fetch(API.product.find, {
			method: 'POST',
			body: JSON.stringify({
				category: category,
				limit: 10
			}),
			headers: new Headers({ 'Content-Type': 'application/json' }),
			next: {
				tags: ['products', `products-category-${category}`],
				revalidate: 3600,
			}
		});

		if (!response.ok) {
			throw new Error('Не удалось получить список курсов');
		}

		return response.json();
	} catch(error) {
		console.error('Ошибка при получении курсов:', error);
		return [];
	}
}
