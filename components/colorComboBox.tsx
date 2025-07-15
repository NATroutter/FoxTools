"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import {cn, rgbToHex} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandInput,
	CommandEmpty
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

export interface ComboBoxColor {
	color: simpleColor,
	label: string,
	value: string
}
export interface simpleColor {
	red: number,
	green: number,
	blue: number
}

export function ColorComboBox({items, onChangeAction} : { items:ComboBoxColor[], onChangeAction?: (e:ComboBoxColor)=>void }) {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState<ComboBoxColor>(items[0])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role="combobox"
					variant="outline"
					aria-expanded={open}
					className="w-[212px] justify-between"
				>
					{selected ? (
						<div className="flex flex-row gap-2">
							<div
								style={{backgroundColor: rgbToHex(selected.color.red,selected.color.green,selected.color.blue)}}
								className="px-4 py-1 h-5"
							></div>
							{selected.label}
						</div>
					) : (
						<div>
							<div
								style={{backgroundColor: rgbToHex(items[0].color.red,items[0].color.green,items[0].color.blue)}}
								className="px-4 py-1 h-5"
							></div>
							{items[0].label}
						</div>
					)}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[212px] p-0">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No found.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setSelected(currentValue === item.value ? item : items[0])
										if (onChangeAction) {
											onChangeAction(currentValue === item.value ? item : items[0])
										}

										setOpen(false)
									}}
								>

									<div
										style={{backgroundColor: rgbToHex(item.color.red,item.color.green,item.color.blue)}}
										className="px-4 py-1 h-5"
									></div> {item.label}

									<Check
										className={cn(
											"ml-auto",
											selected.value === item.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
