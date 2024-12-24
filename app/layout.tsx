import type {Metadata, Viewport} from "next";
import "./globals.css";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/appSidebar";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: {
        template: 'FoxTools | %s',
        default: 'FoxTools',
    },
	keywords: ["tools", "foxtools"],
    authors: [{ name: "NATroutter", url: "https://natroutter.fi" },],
    description: "FoxTools is a collection of different kind of tools to make life easier!",
    manifest: "/site.webmanifest",
	icons: {
		apple: [{ url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" }],
		icon: [
			{ url: "/images/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/images/favicon/favicon.svg", sizes: "96x96", type: "image/svg+xml" }
		],
		shortcut: [{ url: "/images/favicon/favicon.ico" }],
	}
};

export const viewport: Viewport = {
    themeColor: '#C48F1BFF',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex w-full">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs/>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 w-full m-auto">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
        <Toaster />
        </body>
        </html>
    );
}