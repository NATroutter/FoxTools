interface NavItem {
	name: string;
	url: string;
	private: boolean;
}
interface NavCategory {
	title: string;
	items: NavItem[];
}
interface FindResponse {
	category: string,
	item: NavItem
}

export const Tools: NavCategory[] = [
	{
		title: "Server Tools",
		items: [
			{
				name: "SSH Key Setup",
				url: "/tools/server/sshkey",
				private: false,
			},
			{
				name: "Server MOTD",
				url: "/tools/server/motd",
				private: true,
			}
		],
	},
	{
		title: "String Tools",
		items: [
			{
				name: "Base64 Coder",
				url: "/tools/string/base64",
				private: false,
			},
			{
				name: "Case Convert",
				url: "/tools/string/case",
				private: false,
			}
		],
	},
	{
		title: "3D Printing",
		items: [
			{
				name: "Commission Calculator",
				url: "/tools/3d-printing/commission-calculator",
				private: true,
			}
		],
	}
];

export default function getNavigator(authed: boolean) : NavCategory[] {
	return Tools.map(category => {
		const filteredItems = category.items.filter(item => authed || !item.private);
		return {
			title: category.title,
			items: filteredItems
		};
	}).filter(category => category.items.length > 0);
}

export function findEntryByPath(url: string) : FindResponse | null {
	for (const category of Tools) {
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