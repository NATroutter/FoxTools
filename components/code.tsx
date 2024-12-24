'use client'

import {CodeBlock} from "react-code-block";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {FiCheck, FiCopy} from "react-icons/fi";

export function Code({lang, children}: { lang: string, children: React.ReactNode; }) {
	const [copied, setCopied] = useState<boolean>(false);
	const {error, success} = useToast()

	let code = ""
	if (children) {
		code = children.toString().trim();
	}
	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code.trim());
			setCopied(true);
			success("Copied!")
			setTimeout(() => {
				setCopied(false);
			}, 1000);
		} catch (err) {
			error("Failed to copy text");
			console.error("Failed to copy text: ", err); // Log any errors
		}
	};

	return (
		<CodeBlock code={code} language={lang}>
			<div className="relative">
				<CodeBlock.Code className="bg-muted/70 !p-3 rounded-xl shadow-lg ">
					<div className="table-row">
						<CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
						<CodeBlock.LineContent className="table-cell">
							<CodeBlock.Token className="whitespace-break-spaces" />
						</CodeBlock.LineContent>
					</div>
				</CodeBlock.Code>

				<button
					className="bg-muted hover:bg-muted/70 rounded-[5px] p-2 absolute top-2 right-2 text-sm font-semibold"
					onClick={copyCode}
				>
					{copied ? <FiCheck /> : <FiCopy />}
				</button>
			</div>
		</CodeBlock>

	)
}

