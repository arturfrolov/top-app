import {API} from '@/app/api';
import {TopPageModel} from '@/interfaces/page.interface';

export async function getPage(alias: string): Promise<Promise<TopPageModel> | null> {
	const response = await fetch(API.topPage.byAlias + '/' + alias);
	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch page: ${response.statusText} (${response.status})`);
	}

	return response.json();
}
