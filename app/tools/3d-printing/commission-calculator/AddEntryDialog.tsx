import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState, useEffect, ReactNode} from "react";
import {PrintEntryData} from "./printTypes";

interface AddEntryDialogProps {
	data: PrintEntryData;
	onAdd: (data: PrintEntryData) => void;
	children: ReactNode;
}

export function AddEntryDialog({ data, onAdd, children }: AddEntryDialogProps) {
	const [formData, setFormData] = useState<PrintEntryData>(data);

	useEffect(() => {
		setFormData(data);
	}, [data]);

	const handleAdd = () => {
		onAdd(formData);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add New Entry</DialogTitle>
					<DialogDescription>
						Enter the details for the new print entry.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-name">Name</Label>
							<Input
								id="add-name"
								onChange={(e) => setFormData({...formData, name: e.target.value.trim()})}
								value={formData.name}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-print-time">Print Time (hours)</Label>
							<Input
								id="add-print-time"
								onChange={(e) => setFormData({...formData, printingTime: e.target.value.trim().replace(",",".")})}
								value={formData.printingTime}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-cost-per-kg">Material cost per 1kg</Label>
							<Input
								id="add-cost-per-kg"
								onChange={(e) => setFormData({...formData, costPerKg: e.target.value.trim().replace(",",".")})}
								value={formData.costPerKg}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-material-grams">Used material (grams)</Label>
							<Input
								id="add-material-grams"
								onChange={(e) => setFormData({...formData, usedMaterialGrams: e.target.value.trim().replace(",",".")})}
								value={formData.usedMaterialGrams}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-profit">Profit</Label>
							<Input
								id="add-profit"
								onChange={(e) => setFormData({...formData, profit: e.target.value.trim().replace(",",".")})}
								value={formData.profit}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="add-usage-cost">Usage Cost (per hour)</Label>
							<Input
								id="add-usage-cost"
								onChange={(e) => setFormData({...formData, usageCost: e.target.value.trim().replace(",",".")})}
								value={formData.usageCost}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleAdd}>Add</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}