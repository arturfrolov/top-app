import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import {API} from '@/app/api';
import {MenuItem} from '@/interfaces/menu.interface';

const fetchMenu = async (firstCategory: number): Promise<MenuItem[]> => {
	try {
		const response = await fetch(API.topPage.find, {
			method: 'POST',
			body: JSON.stringify({firstCategory}),
			headers: new Headers({ 'Content-Type': 'application/json' }),
			cache: 'no-store',
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
};

const getCachedMenu = unstable_cache(
	fetchMenu,
	['menu'],
	{ tags: ['menu'], revalidate: 3600 },
);

export const getMenu = cache(getCachedMenu);
