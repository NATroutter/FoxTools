import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useState, useEffect, ReactNode} from "react";
import {PrintEntryData} from "./printTypes";

interface EditEntryDialogProps {
	data: PrintEntryData;
	onSave: (data: PrintEntryData) => void;
	children: ReactNode;
}

export function EditEntryDialog({ data, onSave, children }: EditEntryDialogProps) {
	const [formData, setFormData] = useState<PrintEntryData>(data);

	useEffect(() => {
		setFormData(data);
	}, [data]);

	const handleSave = () => {
		onSave(formData);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
			<DialogHeader>
				<DialogTitle>Edit Entry</DialogTitle>
				<DialogDescription>
					Update the details for this print entry.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input
							id="edit-name"
							onChange={(e) => setFormData({...formData, name: e.target.value.trim()})}
							value={formData.name}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="edit-print-time">Print Time (hours)</Label>
						<Input
							id="edit-print-time"
							onChange={(e) => setFormData({...formData, printingTime: e.target.value.trim().replace(",",".")})}
							value={formData.printingTime}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="edit-cost-per-kg">Material cost per 1kg</Label>
						<Input
							id="edit-cost-per-kg"
							onChange={(e) => setFormData({...formData, costPerKg: e.target.value.trim().replace(",",".")})}
							value={formData.costPerKg}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="edit-material-grams">Used material (grams)</Label>
						<Input
							id="edit-material-grams"
							onChange={(e) => setFormData({...formData, usedMaterialGrams: e.target.value.trim().replace(",",".")})}
							value={formData.usedMaterialGrams}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="edit-profit">Profit</Label>
						<Input
							id="edit-profit"
							onChange={(e) => setFormData({...formData, profit: e.target.value.trim().replace(",",".")})}
							value={formData.profit}
						/>
					</div>
				</div>
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button onClick={handleSave}>Save</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
		</Dialog>
	);
}
