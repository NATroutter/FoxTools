'use client'

import * as React from "react"

import {usePathname} from "next/navigation";
import {Separator} from "@radix-ui/react-menu";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {findEntryByPath} from "@/config/sidenav";
import {TitleCase} from "@/lib/utils";

export function Breadcrumbs() {

	const path = usePathname()
	const entry = findEntryByPath(path);

	const crumbs = path.split("/").map((item) => TitleCase(item))
	if (entry) {
		crumbs[crumbs.length -1] = entry.item.name;
	}

	return (
		<>
			<Separator className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>

					{crumbs.map((item, index, array) => (
						<BreadcrumEntry
							item={item}
							useSeparator={index !== 0 && index !== array.length - 1}
							key={index}
						/>
					))}

				</BreadcrumbList>
			</Breadcrumb>
		</>
	)
}

function BreadcrumEntry({item, useSeparator} : {item: string, useSeparator : boolean}) {
	return (
		<>
			<BreadcrumbItem className="hidden md:block">
				<BreadcrumbPage>{item}</BreadcrumbPage>
			</BreadcrumbItem>
			{useSeparator && (<BreadcrumbSeparator className="hidden md:block"/>)}
		</>
	);
}
