'use client'


import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import Turnstile, {useTurnstile} from "react-turnstile";
import {useToast} from "@/hooks/use-toast";

export function LoginDialog() {
	const [password, setPassword] = useState<string>()
	const [captcha, setCaptcha] = useState<string>()
	const { toast } = useToast()

	const turnstile = useTurnstile();

	const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

	const login = async () => {
				const response = await fetch('/api/auth', {
			method: 'POST',
			body: JSON.stringify({
				password: password,
				captcha: captcha
			}),
		})
		if ([200,412,498,401].includes(response.status)) {
			const data = await response.json();
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
				default:
					toast({
						title: data.title,
						description: data.description,
						variant: "error"
					})
					break;
			}
		}
		turnstile.reset();
	}

	return (
		<DialogContent className="w-fit">
			<DialogHeader>
				<DialogTitle className="text-center text-2xl">Authentication</DialogTitle>
				<DialogDescription/>
				<div className="flex flex-col items-center">
					<Input className="mb-2 w-[300px]" placeholder="password..." type="password" onChange={(e) => setPassword(e.target.value)}></Input>
					<Turnstile
						sitekey={sitekey as string}
						theme={"dark"}
						onVerify={(token) => {
							setCaptcha(token)
						}}

					/>
					<Button className="w-[300px]" onClick={login}>Login</Button>
				</div>
			</DialogHeader>
		</DialogContent>
	)
}