import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import {API} from '@/app/api';
import {TopPageModel} from '@/interfaces/page.interface';
import sanitizeHtml from 'sanitize-html';

const fetchPage = async (alias: string): Promise<TopPageModel | null> => {
	try {
		const response = await fetch(
			`${API.topPage.byAlias}/${encodeURIComponent(alias)}`,
			{ cache: 'no-store' },
		);

		if (!response.ok) {
			console.error(`Failed to fetch page for alias "${alias}": HTTP ${response.status} ${response.statusText}`);
			return null;
		}

		const data: TopPageModel = await response.json();

		if (data.seoText) {
			data.seoText = sanitizeHtml(data.seoText, {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
				allowedAttributes: {
					...sanitizeHtml.defaults.allowedAttributes,
					img: ['src', 'alt', 'width', 'height'],
				},
			});
		}

		return data;
	} catch (err) {
		console.error(`Network error fetching page for alias ${alias}:`, err);
		return null;
	}
};

const getCachedPage = unstable_cache(
	fetchPage,
	['page'],
	{ tags: ['pages'], revalidate: 60 },
);

export const getPage = cache(getCachedPage);
