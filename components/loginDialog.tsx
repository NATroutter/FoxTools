'use client'


import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import Turnstile from "react-turnstile";
import {useToast} from "@/hooks/use-toast";
import {cookies} from "next/headers";

export function LoginDialog() {
	const [password, setPassword] = useState<string>()
	const [captcha, setCaptcha] = useState<string>()
	const { toast } = useToast()

	const login = async () => {

		const response = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				password: password,
				captcha: captcha
			}),
		})
		if ([200,412,498,401,409].includes(response.status)) {
			const data = await response.json();
			console.log("resp:",response)
			switch (response.status) {
				case 200:
					toast({
						title: data.title,
						description: data.description,
						variant: "success"
					})
					setTimeout(() => {
						window.location.reload();
					}, 1000);
					break;
				case 412:
				case 498:
				case 401:
				case 409:
					toast({
						title: data.title,
						description: data.description,
						variant: "error"
					})
					break;
			}
		}
	}

	return (
		<DialogContent className="w-fit">
			<DialogHeader>
				<DialogTitle className="text-center text-2xl">Authentication</DialogTitle>
				<div className="flex flex-col items-center">
					<Input className="mb-2 w-[300px]" placeholder="password..." type="password" onChange={(e) => setPassword(e.target.value)}></Input>
					<Turnstile
						sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY as string} theme={"dark"}
						onSuccess={(token) => {
							setCaptcha(token)
						}}
					/>
					<Button className="w-[300px]" onClick={login}>Login</Button>
				</div>
			</DialogHeader>
		</DialogContent>
	)
}
