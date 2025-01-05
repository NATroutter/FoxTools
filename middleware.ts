import { NextRequest, NextResponse } from 'next/server'
import {isAuthenticated} from "@/lib/auth";

const privateTools = [
	"/tools/3d-printing/commission-calculator"
]

export async function middleware(request: NextRequest): Promise<NextResponse | void> {

	const url = new URL(request.url)
	if (privateTools.some(tool => url.pathname.startsWith(tool))) {
		const authed = await isAuthenticated()
		if (!authed) {
			return redirect(request, `/`, 307)
		}
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
function redirect(request: NextRequest, path:string, code:number) {
	return NextResponse.redirect(new URL(path, request.url), {
		status: code,
		headers: getHeader(request)
	})
}
function next(request: NextRequest) {
	return NextResponse.next({
		request: {
			headers: getHeader(request)
		}
	});
}