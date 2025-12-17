export interface PrintEntryData {
	name: string;
	printingTime: string;
	costPerKg: string;
	usedMaterialGrams: string;
	profit: string;
	usageCost: string;
}

export interface Prints {
	name: string;
	printTime: number;
	usageCost: number;
	materialCost: number;
	costPerKg: number;
	usedMaterialGrams: number;
	profit: number;
}

export interface Package {
	name: string;
	price: number;
}