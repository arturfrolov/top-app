import { NextResponse } from 'next/server';
import { getMenu } from '@/api/menu';

export async function GET(req: Request) {
	const id = Number(new URL(req.url).searchParams.get('id'));
	if (Number.isNaN(id)) return NextResponse.json([], { status: 400 });
	try {
		const data = await getMenu(id);
		return NextResponse.json(data);
	} catch {
		return NextResponse.json([], { status: 500 });
	}
}
