"use client";

import { useState, useEffect } from "react";
import { Editor } from "@/components/editor";
import { Templates } from "@/components/templates";
import { Backgrounds } from "@/components/backgrounds";
import { MyDesigns } from "@/components/my-designs";
import { BottomNav } from "@/components/bottom-nav";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CanvasElement, AspectRatio } from "@/types/index";
import Image from "next/image";

export default function Home() {
	const [activeTab, setActiveTab] = useState<
		"editor" | "templates" | "backgrounds" | "designs"
	>("editor");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Shared State
	const [elements, setElements] = useState<CanvasElement[]>([]);
	const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [overlayColor, setOverlayColor] = useState<string>("#000000");
	const [overlayOpacity, setOverlayOpacity] = useState<number>(0);
	const [selectedElement, setSelectedElement] = useState<string | null>(null);

	// Load saved design from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem("currentDesign");
		if (saved) {
			try {
				const data = JSON.parse(saved);
				setElements(data.elements || []);
				setAspectRatio(data.aspectRatio || "1:1");
				setBackgroundColor(data.backgroundColor || "#ffffff");
			} catch (e) {
				console.error("Failed to load saved design", e);
			}
		}
	}, []);

	// Auto-save to localStorage
	useEffect(() => {
		const design = {
			elements,
			aspectRatio,
			backgroundColor,
			overlayColor,
			overlayOpacity,
			timestamp: Date.now(),
		};
		localStorage.setItem("currentDesign", JSON.stringify(design));
	}, [elements, aspectRatio, backgroundColor, overlayColor, overlayOpacity]);

	const handleApplyTemplate = (template: any) => {
		const imageElement = template.backgroundImage
			? {
					id: "bg-" + Date.now(),
					type: "image" as const,
					src: template.backgroundImage,
					x: 0,
					y: 0,
					width: template.aspectRatio === "16:9" ? 1920 : 1080,
					height:
						template.aspectRatio === "1:1"
							? 1080
							: template.aspectRatio === "4:5"
							? 1350
							: template.aspectRatio === "9:16"
							? 1920
							: 1080,
			  }
			: null;

		const newElements = imageElement
			? [imageElement, ...template.elements]
			: template.elements;

		setElements(newElements);
		setAspectRatio(template.aspectRatio);
		setBackgroundColor(template.backgroundColor);
		setActiveTab("editor");
	};

	const handleAddBackground = (newElement: CanvasElement) => {
		// Resize background to fit current aspect ratio
		const dimensions = {
			"1:1": { width: 1080, height: 1080 },
			"4:5": { width: 1080, height: 1350 },
			"9:16": { width: 1080, height: 1920 },
			"16:9": { width: 1920, height: 1080 },
		}[aspectRatio];

		const backgroundElement = {
			...newElement,
			x: 0,
			y: 0,
			width: dimensions.width,
			height: dimensions.height,
			id: "bg-" + Date.now(), // Ensure unique ID
		};

		// Add to the beginning (bottom layer) so it doesn't cover text
		setElements((prev) => [backgroundElement, ...prev]);
		setActiveTab("editor");
	};

	const handleSetBackgroundColor = (color: string) => {
		setBackgroundColor(color);
		setActiveTab("editor");
	};

	const handleLoadDesign = (design: any) => {
		setElements(design.elements || []);
		setAspectRatio(design.aspectRatio || "1:1");
		setBackgroundColor(design.backgroundColor || "#ffffff");
		if (design.overlayColor) setOverlayColor(design.overlayColor);
		if (typeof design.overlayOpacity === "number")
			setOverlayOpacity(design.overlayOpacity);
		setActiveTab("editor");
	};

	return (
		<main className='h-screen flex flex-col bg-background overflow-hidden pb-16'>
			<header className='flex items-center justify-between px-4 py-3 border-b border-border bg-card'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setSidebarOpen(true)}>
					<Menu className='w-5 h-5' />
				</Button>

				{/* <h1 className='text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
					PostCraft
				</h1> */}
				<Image
					src='/postcraft.png'
					alt='PostCraft logo'
					width={112}
					height={112}
				/>

				<div className='w-10' />
			</header>

			<div className='flex-1 overflow-y-auto'>
				{activeTab === "editor" && (
					<Editor
						elements={elements}
						setElements={setElements}
						aspectRatio={aspectRatio}
						setAspectRatio={setAspectRatio}
						backgroundColor={backgroundColor}
						setBackgroundColor={setBackgroundColor}
						overlayColor={overlayColor}
						overlayOpacity={overlayOpacity}
						selectedElement={selectedElement}
						setSelectedElement={setSelectedElement}
					/>
				)}
				{activeTab === "templates" && (
					<Templates onSelectTemplate={handleApplyTemplate} />
				)}
				{activeTab === "backgrounds" && (
					<Backgrounds
						onAddBackground={handleAddBackground}
						onSetBackgroundColor={handleSetBackgroundColor}
						overlayColor={overlayColor}
						overlayOpacity={overlayOpacity}
						onSetOverlayColor={setOverlayColor}
						onSetOverlayOpacity={setOverlayOpacity}
					/>
				)}
				{activeTab === "designs" && (
					<MyDesigns onLoadDesign={handleLoadDesign} />
				)}
			</div>

			<BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

			<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
		</main>
	);
}
