'use server'

import {cookies} from "next/headers";

export async function isAuthenticated() {
	const {PRIVATE_TOOL_PASSWORD} = process.env

	const cookie = await cookies();
	if (cookie.has("auth")) {
		const auth = cookie.get("auth")
		if (auth && auth.value && auth.value === PRIVATE_TOOL_PASSWORD) {
			return true
		}
	}
	return false
}