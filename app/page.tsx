"use client";

import { useState } from "react";
import { Editor } from "@/components/editor";
import { Templates } from "@/components/templates";
import { Backgrounds } from "@/components/backgrounds";
import { MyDesigns } from "@/components/my-designs";
import { BottomNav } from "@/components/bottom-nav";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [activeTab, setActiveTab] = useState<
		"editor" | "templates" | "backgrounds" | "designs"
	>("editor");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<main className='h-screen flex flex-col bg-background overflow-hidden pb-16'>
			<header className='flex items-center justify-between px-4 py-3 border-b border-border bg-card'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setSidebarOpen(true)}>
					<Menu className='w-5 h-5' />
				</Button>

				<h1 className='text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
					PostCraft
				</h1>

				<div className='w-10' />
			</header>

			<div className='flex-1 overflow-y-auto'>
				{activeTab === "editor" && <Editor />}
				{activeTab === "templates" && <Templates />}
				{activeTab === "backgrounds" && <Backgrounds />}
				{activeTab === "designs" && <MyDesigns />}
			</div>

			<BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

			<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
		</main>
	);
}
