import {getTimestamp, getUserIP, validateCaptcha} from "@/lib/utils";
import {cookies} from "next/headers";

const {PRIVATE_TOOL_PASSWORD} = process.env

export async function POST(request: Request) {
	const { password, captcha } = await request.json();

	const userIP = getUserIP(request);

	if (!password) {
		return response(412, "Email or password not provided!") //Precondition failed
	}
	if (!captcha) {
		return response(412, "Captcha not provided!") //Precondition failed
	}
	console.log("["+getTimestamp()+"] Login Attempt from ("+userIP+") using password \""+password+"\"")

	const isValidCaptcha = await validateCaptcha(captcha);

	if (!isValidCaptcha) {
		return response(498, "Captcha verification failed!") //Token expired/invalid
	}

	if (password !== PRIVATE_TOOL_PASSWORD) {
		return response(401, "Invalid password!") //Unauthorized;
	}

	console.log("["+getTimestamp()+"] User authenticated from ("+userIP+")");


	const cookie = await cookies();
	cookie.set({
		name: "auth",
		value: password,
		secure: true,
		sameSite: "strict"
	});
	return response(200, "You have been logged in!", password)
}

function response(status: number, description: string, key?: string) {
	const title = "Authentication " + (status == 200 ? "Success" : "Failed") + "!";
	return new Response(
		JSON.stringify({ title: title, description: description, key: key}),
		{
			status: status,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}