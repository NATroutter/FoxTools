'use client'

import * as React from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image";
import {usePathname} from "next/navigation";
import getNavigator from "@/config/sidenav";
import Link from "next/link";

export function AppSidebar({ version, authed }: {version: string|undefined, authed:boolean }) {

	const path = usePathname()

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenuButton size="lg" asChild className="rounded-[5px]">
					<Link href="/">
						<div className="flex aspect-square size-8 items-center justify-center rounded-[5px] text-sidebar-primary-foreground">
							<Image
								className="w-full aspect-square"
								src="/images/logo.png"
								alt="logo"
								sizes="100vw"
								width={0}
								height={0}
								style={{
									width: '100%',
									height: '100%',
								}}
							/>
						</div>
						<div className="flex flex-col gap-0.5 leading-none">
							<span className="font-semibold">FoxTools</span>
							<span className="">v{version}</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				{getNavigator(authed).map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton asChild isActive={path == item.url} className={"rounded-[5px]"}>
											<a href={item.url}>{item.name}</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
