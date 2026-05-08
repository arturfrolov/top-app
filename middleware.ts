import {NextResponse, type NextRequest} from 'next/server';

const allowedTopLevelPaths = new Set([
	'',
	'api',
	'books',
	'courses',
	'favicon.ico',
	'products',
	'search',
	'services',
]);

export function middleware(request: NextRequest) {
	const firstSegment = request.nextUrl.pathname.split('/')[1] ?? '';

	if (firstSegment.startsWith('_next') || allowedTopLevelPaths.has(firstSegment)) {
		return NextResponse.next();
	}

	return new NextResponse('Not found', { status: 404 });
}

export const config = {
	matcher: '/((?!_next/static|_next/image).*)',
};
