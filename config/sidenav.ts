interface NavItem {
	name: string;
	url: string;
}
interface NavCategory {
	title: string;
	items: NavItem[];
}
interface FindResponse {
	category: string,
	item: NavItem
}

const publicTools: NavCategory[] = [
	{
		title: "Server Tools",
		items: [
			{
				name: "SSH Key Setup",
				url: "/tools/server/sshkey",
			}
		],
	},
	{
		title: "String Tools",
		items: [
			{
				name: "Base64 Coder",
				url: "/tools/string/base64",
			},
			{
				name: "Case Convert",
				url: "/tools/string/case",
			}
		],
	}
];
const privateTools: NavCategory[] = [
	{
		title: "3D Printing",
		items: [
			{
				name: "Commission Calculator",
				url: "/tools/3d-printing/commission-calculator",
			}
		],
	}
];


export default function getNavigator(authed?:boolean) {
	const tools:NavCategory[] = []
	publicTools.forEach(i=>tools.push(i))

	if (authed) {
		privateTools.forEach(i=>tools.push(i))
	}
	return tools;
}

export function findEntryByPath(url: string) : FindResponse | null {
	for (const category of privateTools) {
		for (const item of category.items) {
			if (item.url === url) {
				return {
					category: category.title,
					item: item
				};
			}
		}
	}
	return null;
}