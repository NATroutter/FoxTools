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
import {GalleryVerticalEnd} from "lucide-react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import getNavigator from "@/config/sidenav";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	const path = usePathname()

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-[5px]">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
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
						<div className="flex flex-col leading-none">
							<span className="font-semibold">FoxTools</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				{getNavigator().map((item) => (
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
