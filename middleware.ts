import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest): Promise<NextResponse | void> {

	//Forces to use https
	if (!request.url.startsWith('https') && process.env.NODE_ENV === 'production') {
		return NextResponse.redirect(`https://${request.nextUrl.host}${request.nextUrl.pathname}`,301)
	}
	return next(request);
}

function getHeader(request: NextRequest) : Headers {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-url', request.url);
	requestHeaders.set('x-host', request.nextUrl.host);
	requestHeaders.set('x-proto', request.nextUrl.protocol);
	requestHeaders.set('x-path', request.nextUrl.pathname);
	return requestHeaders;
}
function next(request: NextRequest) {
	return NextResponse.next({
		request: {
			headers: getHeader(request)
		}
	});
}