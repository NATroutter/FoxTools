'use client'

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCurrency, getDaysAndHours} from "@/lib/utils";
import {Combobox, ComboboxItem} from "@/components/combobox";

interface Prints {
	name: string
	printTime: number,
	usageCost: number,
	materialCost: number,
	profit: number
}
interface Package {
	name: string,
	price: number
}

const shipingPrices: Package[] = [
	{
		name: "Free",
		price: 0
	},
	{
		name: "XXS (3x25x35)",
		price: 5.90
	},
	{
		name: "XS (11x32x42)",
		price: 7.90
	},
	{
		name: "M (19x36x60)",
		price: 9.90
	},
	{
		name: "L (36x37x60)",
		price: 11.90
	},
	{
		name: "XL (40x60x100)",
		price: 19.90
	},
	{
		name: "XXL",
		price: 39.90
	}
]

function shippingComboBox() {
	const combo: ComboboxItem[] = [];
	shipingPrices.forEach(i=> combo.push({
		label: i.name + " - " + i.price + "€",
		value: i.name
	}))
	return combo;
}

export default function CommissionCalculator() {
	const [name, setName] = useState<string>("print #1")
	const [printingTime, setPrintingTime] = useState<string>("1")
	const [usageCost, setUsageCost] = useState<string>("0.15")
	const [materialCost, setMaterialCost] = useState<string>("1.70")
	const [profit, setProfit] = useState<string>("0")
	const [globalProfit, setGlobalProfit] = useState<string>("5")
	const [shipingCost, setShipingCost] = useState<ComboboxItem>(shippingComboBox()[0])
	const [printList, setPrintList] = useState<Prints[]>([])

	const { toast } = useToast()

	const parseInputs = () => {
		const time = Number(printingTime)
		const usage = Number(usageCost)
		const material = Number(materialCost)
		const _profit = Number(profit)
		const _globalprofit = Number(globalProfit)

		if (isNaN(time)) {
			toast({
				title: "Invalid input!",
				description: "Printing time is not a number",
				variant: "error"
			})
			return undefined;
		}
		if (isNaN(usage)) {
			toast({
				title: "Invalid input!",
				description: "Usage cost is not a number",
				variant: "error"
			})
			return undefined;
		}
		if (isNaN(material)) {
			toast({
				title: "Invalid input!",
				description: "Material cost is not a number",
				variant: "error"
			})
			return undefined;
		}
		if (isNaN(_profit)) {
			toast({
				title: "Invalid input!",
				description: "Profit is not a number",
				variant: "error"
			})
			return undefined;
		}
		if (isNaN(_globalprofit)) {
			toast({
				title: "Invalid input!",
				description: "Profit (Global) is not a number",
				variant: "error"
			})
			return undefined;
		}
		return {time,usage,material,profit: _profit,globalprofit: _globalprofit};
	}

	const savePrint = () => {
		if (printList.length > 0) {
			const index = printList.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

			if (index !== -1) {

				const inputs = parseInputs();
				if (!inputs) return;

				printList[index] = {
					name: name,
					printTime: inputs.time,
					usageCost: inputs.usage,
					materialCost: inputs.material,
					profit: inputs.profit
				};
				toast({
					title: "Edited!",
					description: "Entry has been editted!",
					variant: "success"
				});
				return;
			} else {
				toast({
					title: "Invalid name!",
					description: "Item with that name does not exist",
					variant: "error"
				});
			}
		} else {
			toast({
				title: "No entries!",
				description: "There are no entries in the table!",
				variant: "error"
			});
		}
	}

	const addPrint = () => {
		if (printList.length > 0) {
			if (printList.find(p=>p.name.toLowerCase() === name.toLowerCase())) {
				toast({
					title: "Invalid name!",
					description: "Item with that name already exists",
					variant: "error"
				})
				return;
			}
		}
		const inputs = parseInputs();
		if (!inputs) return;

		const prints:Prints[] = []
		printList.forEach(p=>prints.push(p))

		prints.push({
			name: name,
			printTime: inputs.time,
			usageCost: inputs.usage,
			materialCost: inputs.material,
			profit: inputs.profit
		})
		setPrintList(prints);
		setName("print #" + (prints.length + 1))
		setPrintingTime("")
		setMaterialCost("")
		setProfit("0")
	}

	const reset = () => {
		setPrintList([])
		setName("print #0")
		setPrintingTime("1")
		setMaterialCost("1.70")
		setProfit("0")
		setGlobalProfit("5")
		setUsageCost("0.15")
		setShipingCost(shippingComboBox()[0])
	}

	function getTotalPrintTime() {
		return printList ? printList.reduce((total, print) => total + print.printTime, 0) : 0
	}
	function getTotalMaterialCost() {
		return formatCurrency(printList ? printList.reduce((total, print) => total + print.materialCost, 0) : 0);
	}
	function getCommissionPrice() : string {
		if (printList) {
			let totalCost:number = 0;

			//Sum all prints
			printList.forEach(print=> {
				totalCost += ((print.printTime * print.usageCost) + print.materialCost + print.profit);
			})

			//Add shipping price
			const pack = shipingPrices.find(pkg => pkg.name === shipingCost.value);
			if (pack && pack.price > 0) {
				totalCost += pack.price;
			}

			//Add global profit
			const gProfit : number = Number(globalProfit);
			if (!isNaN(gProfit)) {
				totalCost += gProfit;
			}

			return formatCurrency(totalCost)
		}
		return formatCurrency(0)
	}

	return (
		<>
			<div className="flex justify-center flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">Commission Calculator</h1>
					<hr/>
					<div className="flex justify-center items-end flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label>Name</Label>
							<Input onChange={(e) => setName(e.target.value.trim())} value={name}/>
						</div>
						<div className="flex flex-col">
							<Label>Print Time (hours)</Label>
							<Input onChange={(e) => setPrintingTime(e.target.value.trim())} value={printingTime}/>
						</div>
						<div className="flex flex-col">
							<Label>Material Cost</Label>
							<Input onChange={(e) => setMaterialCost(e.target.value.trim())} value={materialCost}/>
						</div>
					</div>
					<div className="flex justify-center items-end flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label>Profit</Label>
							<Input onChange={(e) => setProfit(e.target.value.trim())} value={profit}/>
						</div>
						<div className="flex flex-col">
							<Label>Profit (Global)</Label>
							<Input onChange={(e) => setGlobalProfit(e.target.value.trim())} value={globalProfit}/>
						</div>
						<div className="flex flex-col">
							<Label>Usage Cost (per hour)</Label>
							<Input onChange={(e) => setUsageCost(e.target.value.trim())} value={usageCost}/>
						</div>
					</div>
					<div className="flex justify-center items-end flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label>Shipping Price</Label>
							<Combobox items={shippingComboBox()} onChangeAction={(e) => setShipingCost(e)}/>
						</div>
					</div>
					<div className="flex justify-center items-end flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col mp-0">
							<Button onClick={reset}>Reset</Button>
						</div>
						<div className="flex flex-col mp-0">
							<Button onClick={addPrint}>Add</Button>
						</div>
						<div className="flex flex-col mp-0">
							<Button onClick={savePrint}>Save</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center min-h-[100vh] flex-1 rounded-xl bg-panel md:min-h-min">
				<div className="flex w-full h-full flex-col p-5">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Name</TableHead>
								<TableHead>Printing Time</TableHead>
								<TableHead>Material Cost</TableHead>
								<TableHead>Profit</TableHead>
								<TableHead>Usage Cost</TableHead>
								<TableHead className="text-right"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{printList.map((print, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{print.name}</TableCell>
									<TableCell>{print.printTime}h</TableCell>
									<TableCell>{print.materialCost}€</TableCell>
									<TableCell>{print.profit}€</TableCell>
									<TableCell>{print.usageCost}€</TableCell>
									<TableCell className="text-right">
										<div className="flex gap-1 justify-end">
											<Button onClick={()=> {
												setName(print.name)
												setPrintingTime(String(print.printTime))
												setMaterialCost(String(print.materialCost))
												setProfit(String(print.profit))
												setUsageCost(String(print.usageCost))
											}}>Edit</Button>
											<Button onClick={()=> {
												const prints = printList.filter(p => p.name !== print.name);
												setPrintList(prints);
											}}>Remove</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						{/*<TableFooter>*/}
						{/*	<TableRow>*/}
						{/*		<TableCell>Total</TableCell>*/}
						{/*		<TableCell>{getTotalPrintTime() +" "+ (getTotalPrintTime() > 1 ? "Hours" : "Hour")} </TableCell>*/}
						{/*		<TableCell>{formatCurrency(getTotalUsageCost())}</TableCell>*/}
						{/*		<TableCell className="text-right">{formatCurrency(getTotalMaterialCost())}</TableCell>*/}
						{/*	</TableRow>*/}
						{/*</TableFooter>*/}
					</Table>
					{(printList && printList.length > 0) && (
						<div className="mt-4">
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Print Time:</h3>
								<h3 className="text-2xl font-mono w-full">{getDaysAndHours(getTotalPrintTime())}</h3>
							</div>
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Material Price:</h3>
								<h3 className="text-2xl font-mono w-full">{getTotalMaterialCost()}</h3>
							</div>
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Total Price:</h3>
								<h3 className="text-2xl font-mono w-full">{getCommissionPrice()}</h3>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}