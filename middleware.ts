import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest): Promise<NextResponse | void> {
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