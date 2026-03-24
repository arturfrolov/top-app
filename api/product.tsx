import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import {API} from '@/app/api';
import {ProductModel} from '@/interfaces/product.interface';

const fetchProduct = async (category: string): Promise<ProductModel[]> => {
	try {
		const response = await fetch(API.product.find, {
			method: 'POST',
			body: JSON.stringify({ category, limit: 10 }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error('Не удалось получить список курсов');
		}

		return response.json();
	} catch(error) {
		console.error('Ошибка при получении курсов:', error);
		return [];
	}
};

const getCachedProduct = unstable_cache(
	fetchProduct,
	['products'],
	{ tags: ['products'], revalidate: 3600 },
);

export const getProduct = cache(getCachedProduct);
