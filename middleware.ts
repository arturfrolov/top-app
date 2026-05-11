import {NextResponse, type NextRequest} from 'next/server';
import {isFirstLevelRoute, isLikelyPageAlias} from '@/helpers/route-guards';

const allowedTopLevelPaths = new Set([
	'',
	'api',
	'favicon.ico',
	'search',
]);

export function middleware(request: NextRequest) {
	const [, firstSegment = '', secondSegment] = request.nextUrl.pathname.split('/');

	if (firstSegment.startsWith('_next') || allowedTopLevelPaths.has(firstSegment)) {
		return NextResponse.next();
	}

	if (isFirstLevelRoute(firstSegment) && secondSegment && isLikelyPageAlias(secondSegment)) {
		return NextResponse.next();
	}

	return new NextResponse('Not found', { status: 404 });
}

export const config = {
	matcher: '/((?!_next/static|_next/image).*)',
};
