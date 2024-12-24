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

const data: NavCategory[] = [
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


export default function getNavigator() {
	return data;
}

export function findEntryByPath(url: string) : FindResponse | null {
	for (const category of data) {
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