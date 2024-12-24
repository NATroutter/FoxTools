'use client'

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Slider} from "@/components/ui/slider";
import {Spinner} from "@/components/ui/Spinner";

export default function Base64Tool() {
	const layerInput = useRef<HTMLInputElement | null>(null);
	const [input, setInput] = useState<string>("")
	const [output, setOutput] = useState<string>("")
	const [layers, setLayers] = useState<number>(1)
	const [encoding, setEncoding] = useState<boolean>(false)
	const [decoding, setDecoding] = useState<boolean>(false)
	const { error, success } = useToast()

	const maxLayers : number = 100000000;

	useEffect(() => {
		if (layerInput.current) {
			const size = String(layers).length*7.7;
			layerInput.current.style.width = `${size}px`;
			console.log(layers.toString().length)
		}
	}, [layers]);

	function changeLayers(e: ChangeEvent<HTMLInputElement>) {
		const num = Number(e.target.value);
		if (num) {
			if (num >= maxLayers) {
				setLayers(maxLayers)
			} else {
				setLayers(num)
			}
		}
	}

	const encode = async () => {
		setOutput("");
		setEncoding(true);

		if (input.length > 0) {
			let value = input
			const processLayers = async () => {
				for (let i = 0; i < layers; i++) {
					value = btoa(value)
					await new Promise((resolve) => setTimeout(resolve, 0))
				}
				setOutput(value)
				success("Input has been encoded!")
				setEncoding(false)
			};
			await processLayers()
		} else {
			error("Input is empty!")
			setEncoding(false)
		}
	};
	const decode = async () => {
		setOutput("");
		setDecoding(true);

		if (input.length > 0) {
			let value = input
			const processLayers = async () => {
				for (let i = 0; i < layers; i++) {
					value = atob(value)
					await new Promise((resolve) => setTimeout(resolve, 0))
				}
				setOutput(value)
				success("Input has been encoded!")
				setDecoding(false)
			};
			await processLayers()
		} else {
			error("Input is empty!")
			setDecoding(false)
		}
	};

	async function OutToIn() {
		if (output.length > 0) {
			setInput(output);
			setOutput("")
		} else {
			error("Output are empty!")
		}
	}
	async function reset() {
		if (output.length > 0 || input.length > 0 || layers > 1) {
			setInput("");
			setOutput("");
			setLayers(1)
			success("Everything has been reset to default!")
		} else {
			error("Everything has already been reset to default!")
		}
	}

	return (
		<>
			<div className="flex justify-center min-h-[100vh] flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">Base64 Coder</h1>
					<hr/>
					<div className="flex flex-col p-4 justify-center">
						<div className="flex flex-row mb-1.5">
							<span className="text-sm font-mono">Layers: (</span>
							<input ref={layerInput} className="hiddenInput" type="text" value={layers} onChange={(e) => changeLayers(e)} />
							<span className="text-sm font-mono">)</span>
						</div>
						<Slider defaultValue={[1]} min={1} max={100} step={1} onValueChange={(e) => setLayers(e[0])} value={[layers]}/>
					</div>
					<div className="flex gap-2 justify-center">
						<Button className="w-20" disabled={encoding || decoding} onClick={encode}>{encoding ? <Spinner/> : "Encode"}</Button>
						<Button className="w-20" disabled={encoding || decoding} onClick={decode}>{decoding ? <Spinner/> : "Decode"}</Button>
						<Button className="w-20" disabled={encoding || decoding} onClick={OutToIn}>Out to In</Button>
						<Button className="w-20" disabled={encoding || decoding} onClick={reset}>Reset</Button>
					</div>
				</div>
			</div>
			<div className="flex justify-center min-h-[100vh] flex-1 rounded-xl bg-panel md:min-h-min">

				<ResizablePanelGroup direction="horizontal" className="flex flex-col">
					<ResizablePanel className="flex w-full h-full flex-col">
						<h2 className="p-2 pb-0 font-mono">Input:</h2>
						<textarea
							value={input}
							onChange={(e)=>setInput(e.target.value)}
							className="flex w-full h-full bg-panel resize-none outline-none p-2"
						></textarea>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel className="flex w-full h-full flex-col">
						<h2 className="p-2 pb-0 font-mono">Output:</h2>
						<textarea
							value={output}
							onChange={(e)=>setOutput(e.target.value)}
							className="flex w-full h-full bg-panel resize-none outline-none p-2"
						></textarea>
					</ResizablePanel>
				</ResizablePanelGroup>

			</div>
		</>
	);
}
