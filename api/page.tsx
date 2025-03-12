import {API} from '@/app/api';

export async function getPage(alias: string): Promise<TopPageModel> | null {
	const response = await fetch(API.topPage.byAlias + '/' + alias);
	if (!response.ok) {
		return null;
	}

	return response.json();
}
