"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";

export interface ComboboxItem {
	value: string,
	label: string
}
export function Combobox({items, onChangeAction} : { items:ComboboxItem[], onChangeAction?: (e:ComboboxItem)=>void }) {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState<ComboboxItem>(items[0])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role="combobox"
					variant="outline"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selected ? selected.label : items[0].label}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
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
									{item.label}
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
