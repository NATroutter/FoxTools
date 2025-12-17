'use client'

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatCurrency, getDaysAndHours} from "@/lib/utils";
import {ComboBox, ComboboxItem} from "@/components/comboBox";
import {AddEntryDialog} from "./AddEntryDialog";
import {EditEntryDialog} from "./EditEntryDialog";
import {PrintEntryData, Prints, Package} from "./printTypes";

const shipingPrices: Package[] = [
	{
		name: "Free",
		price: 0
	},
	{
		name: "Custom",
		price: 0
	},
	{
		name: "XXS (3x25x35)",
		price: 6.90
	},
	{
		name: "XS (11x32x42)",
		price: 8.90
	},
	{
		name: "M (19x36x60)",
		price: 10.90
	},
	{
		name: "L (36x37x60)",
		price: 14.90
	},
	{
		name: "XL (40x60x100)",
		price: 22.90
	},
	{
		name: "XXL",
		price: 44.90
	}
]

function shippingComboBox() {
	const combo: ComboboxItem[] = [];
	shipingPrices.forEach(i=> combo.push({
		label: i.name === "Custom" ? i.name : i.name + " - " + i.price + "€",
		value: i.name
	}))
	return combo;
}

export default function CommissionCalculator() {
	const [globalProfit, setGlobalProfit] = useState<string>("0")
	const [shipingCost, setShipingCost] = useState<ComboboxItem>(shippingComboBox()[0])
	const [customShippingPrice, setCustomShippingPrice] = useState<string>("0")
	const [printList, setPrintList] = useState<Prints[]>([])
	const [editingPrint, setEditingPrint] = useState<Prints | null>(null)

	const { toast } = useToast()

	const getInitialAddData = (): PrintEntryData => ({
		name: `print #${printList.length + 1}`,
		printingTime: "1",
		costPerKg: "10",
		usedMaterialGrams: "100",
		profit: "0",
		usageCost: "0.15"
	});

	const getInitialEditData = (print: Prints): PrintEntryData => ({
		name: print.name,
		printingTime: String(print.printTime),
		costPerKg: String(print.costPerKg),
		usedMaterialGrams: String(print.usedMaterialGrams),
		profit: String(print.profit),
		usageCost: String(print.usageCost)
	});

	const parseInputs = (data: PrintEntryData) => {
		const time = Number(data.printingTime.replace(",", "."))
		const usage = Number(data.usageCost.replace(",", "."))
		const kgCost = Number(data.costPerKg.replace(",", "."))
		const grams = Number(data.usedMaterialGrams.replace(",", "."))
		const _profit = Number(data.profit.replace(",", "."))

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
		if (isNaN(kgCost)) {
			toast({
				title: "Invalid input!",
				description: "Cost per 1kg is not a number",
				variant: "error"
			})
			return undefined;
		}
		if (isNaN(grams)) {
			toast({
				title: "Invalid input!",
				description: "Used material grams is not a number",
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

		const material = (kgCost * grams) / 1000;
		return {time, usage, material, profit: _profit};
	}

	const handleAdd = (data: PrintEntryData) => {
		if (printList.find(p=>p.name.toLowerCase() === data.name.toLowerCase())) {
			toast({
				title: "Invalid name!",
				description: "Item with that name already exists",
				variant: "error"
			})
			return;
		}

		const inputs = parseInputs(data);
		if (!inputs) return;

		const newPrint: Prints = {
			name: data.name,
			printTime: inputs.time,
			usageCost: inputs.usage,
			materialCost: inputs.material,
			costPerKg: Number(data.costPerKg),
			usedMaterialGrams: Number(data.usedMaterialGrams),
			profit: inputs.profit
		}
		setPrintList([...printList, newPrint]);
		toast({
			title: "Added!",
			description: "Entry has been added!",
			variant: "success"
		});
	}

	const handleSave = (data: PrintEntryData) => {
		if (!editingPrint) return;

		const index = printList.findIndex(p => p.name.toLowerCase() === editingPrint.name.toLowerCase());
		if (index === -1) {
			toast({
				title: "Invalid name!",
				description: "Item with that name does not exist",
				variant: "error"
			});
			return;
		}

		const inputs = parseInputs(data);
		if (!inputs) return;

		const updatedList = [...printList];
		updatedList[index] = {
			name: data.name,
			printTime: inputs.time,
			usageCost: inputs.usage,
			materialCost: inputs.material,
			costPerKg: Number(data.costPerKg),
			usedMaterialGrams: Number(data.usedMaterialGrams),
			profit: inputs.profit
		};
		setPrintList(updatedList);
		toast({
			title: "Saved!",
			description: "Entry has been updated!",
			variant: "success"
		});
	}

	const reset = () => {
		setPrintList([])
		setGlobalProfit("0")
		setShipingCost(shippingComboBox()[0])
		setCustomShippingPrice("0")
	}

	function getTotalPrintTime() {
		return printList ? printList.reduce((total, print) => total + print.printTime, 0) : 0
	}
	function getTotalMaterialCost() {
		return formatCurrency(printList ? printList.reduce((total, print) => total + print.materialCost, 0) : 0);
	}
	function getTotalUsageCost() {
		return formatCurrency(printList ? printList.reduce((total, print) => total + (print.printTime * print.usageCost), 0) : 0);
	}
	function getTotalProfit() {
		const printsProfit = printList ? printList.reduce((total, print) => total + print.profit, 0) : 0;
		const gProfit = Number(globalProfit.replace(",", "."));
		const globalProfitValue = !isNaN(gProfit) && gProfit > 0 ? gProfit : 0;
		return formatCurrency(printsProfit + globalProfitValue);
	}
	function getTotalShipping() {
		if (shipingCost.value === "Custom") {
			const customPrice = Number(customShippingPrice.replace(",", "."));
			if (!isNaN(customPrice) && customPrice > 0) {
				return customPrice;
			}
			// If invalid, treat as 0 (don't set state during render)
		} else {
			const pack = shipingPrices.find(pkg => pkg.name === shipingCost.value);
			if (pack && pack.price > 0) {
				return pack.price;
			}
		}
	}
	function getCommissionPrice() : string {
		if (printList) {
			let totalCost:number = 0;

			//Sum all prints
			printList.forEach(print=> {
				totalCost += ((print.printTime * print.usageCost) + print.materialCost + print.profit);
			})

			//Add shipping price
			const totalShipping = getTotalShipping();
			if (totalShipping != undefined) {
				totalCost += totalShipping;
			}


			//Add global profit
			const gProfit : number = Number(globalProfit.replace(",", "."));
			if (!isNaN(gProfit) && gProfit > 0) {
				totalCost += gProfit;
			}
			// If invalid, treat as 0 (don't set state during render)

			return formatCurrency(totalCost)
		}
		return formatCurrency(0)
	}

	const totalShipping = getTotalShipping();

	return (
		<>
			<div className="flex justify-center flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">Commission Calculator</h1>
					<hr/>
					<div className="flex justify-center items-center flex-wrap gap-2 pt-4 p-2">


							<AddEntryDialog
								data={getInitialAddData()}
								onAdd={handleAdd}
							>
								<Button>Add New Entry</Button>
							</AddEntryDialog>
						<Button onClick={reset} variant="destructive">Reset Everything</Button>
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
								<TableHead>Material Cost per 1KG</TableHead>
								<TableHead>Material Used</TableHead>
								<TableHead>Material Cost</TableHead>
								<TableHead>Profit</TableHead>
								<TableHead>Usage Cost</TableHead>
								<TableHead>Total Usage Cost</TableHead>
								<TableHead className="text-right"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{printList.map((print, i) => (
								<TableRow key={i}>
									<TableCell className="font-medium">{print.name}</TableCell>
									<TableCell>{print.printTime}h</TableCell>
									<TableCell>{formatCurrency(print.costPerKg)}</TableCell>
									<TableCell>{print.usedMaterialGrams}g</TableCell>
									<TableCell>{formatCurrency(print.materialCost)}</TableCell>
									<TableCell>{formatCurrency(print.profit)}</TableCell>
									<TableCell>{formatCurrency(print.usageCost)}</TableCell>
									<TableCell>{formatCurrency((print.printTime * print.usageCost))}</TableCell>

									<TableCell className="text-right">
										<div className="flex gap-1 justify-end">
											<EditEntryDialog
												data={getInitialEditData(print)}
												onSave={handleSave}
											>
												<Button onClick={() => setEditingPrint(print)}>Edit</Button>
											</EditEntryDialog>
											<Button onClick={()=> {
												const prints = printList.filter(p => p.name !== print.name);
												setPrintList(prints);
											}} variant="destructive">Remove</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<hr/>
					{(printList && printList.length > 0) && (
						<div className="mt-4">
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Print Time:</h3>
								<h3 className="text-2xl font-mono w-full">{getDaysAndHours(getTotalPrintTime())}</h3>
							</div>
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Profit:</h3>
								<h3 className="text-2xl font-mono w-full">{getTotalProfit()}</h3>
							</div>
							{totalShipping !== undefined && (
								<div className="flex flex-row w-full">
									<h3 className="text-2xl font-mono w-96">Shipping:</h3>
									<h3 className="text-2xl font-mono w-full">
										{formatCurrency(totalShipping)}
									</h3>
								</div>
							)}
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Material Cost:</h3>
								<h3 className="text-2xl font-mono w-full">{getTotalMaterialCost()}</h3>
							</div>
							<div className="flex flex-row w-full">
								<h3 className="text-2xl font-mono w-96">Usage Cost:</h3>
								<h3 className="text-2xl font-mono w-full">{getTotalUsageCost()}</h3>
							</div>
							<div className="flex flex-row w-full mt-5 font-bold">
								<h3 className="text-2xl font-mono w-96">Total Price:</h3>
								<h3 className="text-2xl font-mono w-full">{getCommissionPrice()}</h3>
							</div>
							<div className="flex justify-start items-end flex-wrap gap-2 pt-10 p-2">
								<div className="flex flex-col">
									<Label>Profit (Global)</Label>
									<Input onChange={(e) => {
										const value = e.target.value.trim();
										const num = Number(value.replace(",", "."));
										if (value === "" || !isNaN(num)) {
											setGlobalProfit(value);
										} else {
											setGlobalProfit("0");
										}
									}} value={globalProfit}/>
								</div>
								<div className="flex flex-col">
									<Label>Shipping Price</Label>
									<ComboBox items={shippingComboBox()} onChangeAction={(e) => setShipingCost(e)}/>
								</div>
								{shipingCost.value === "Custom" && (
									<div className="flex flex-col">
										<Label>Custom Shipping Price</Label>
										<Input onChange={(e) => {
											const value = e.target.value.trim();
											const num = Number(value.replace(",", "."));
											if (value === "" || !isNaN(num)) {
												setCustomShippingPrice(value);
											} else {
												setCustomShippingPrice("0");
											}
										}} value={customShippingPrice}/>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}