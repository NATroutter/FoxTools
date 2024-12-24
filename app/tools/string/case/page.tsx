'use client'

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {capitalizedCase, sentenceCase, TitleCase} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";

export default function CaseConvertTool() {
	const [text, setText] = useState<string>("")
	const [copied, setCopied] = useState<boolean>(false);
	const {error, success} = useToast()


	async function upper() {
		if (text && text.length > 0) {
			setText(text.toUpperCase())
			success("Input converted!")
		} else {
			error("Input is empty!")
		}
	}
	async function lower() {
		if (text && text.length > 0) {
			setText(text.toLowerCase())
			success("Input converted!")
		} else {
			error("Input is empty!")
		}
	}
	async function sentence() {
		if (text && text.length > 0) {
			setText(sentenceCase(text))
			success("Input converted!")
		} else {
			error("Input is empty!")
		}
	}
	async function capitalized() {
		if (text && text.length > 0) {
			setText(capitalizedCase(text))
			success("Input converted!")
		} else {
			error("Input is empty!")
		}
	}
	async function title() {
		if (text && text.length > 0) {
			setText(TitleCase(text))
			success("Input converted!")
		} else {
			error("Input is empty!")
		}
	}
	async function clear() {
		if (text && text.length > 0) {
			setText("")
			success("Input Cleared!")
		} else {
			error("Input is already cleared!")
		}
	}
	async function copy() {
		if (text && text.length > 0) {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);

				success("Text Copied!")

				setTimeout(() => {
					setCopied(false);
				}, 1000);
			} catch (err) {
				error("Failed to copy text");
				console.error("Failed to copy text: ", err);
			}
		} else {
			error("Input is empty!")
		}
	}


	return (
		<>
			<div className="flex justify-center min-h-[100vh] flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">Case Convert</h1>
					<hr/>
					<div className="flex gap-2 justify-center pt-4 p-2">
						<Button onClick={upper}>Upper</Button>
						<Button onClick={lower}>Lower</Button>
						<Button onClick={capitalized}>Capitalized</Button>
						<Button onClick={sentence}>Sentence</Button>
						<Button onClick={title}>Title</Button>
					</div>
					<div className="flex gap-2 justify-center pt-4 p-2">
						<Button onClick={copy}>{copied ? "Copied!" : "Copy To Clipboard"}</Button>
						<Button onClick={clear}>Clear</Button>
					</div>
				</div>
			</div>
			<div className="flex justify-center min-h-[100vh] flex-1 rounded-xl bg-panel md:min-h-min">
				<div className="flex w-full h-full flex-col">
					<h2 className="p-2 pb-0 font-mono">Input:</h2>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="flex w-full h-full bg-panel resize-none outline-none p-2"
					></textarea>
				</div>
			</div>
		</>
	);
}
