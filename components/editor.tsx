"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Download,
	Trash2,
	Type,
	Layout,
	Heading1,
	Heading2,
	Heading3,
	Pilcrow,
	X,
} from "lucide-react";
import { Canvas } from "@/components/canvas";
import { ElementControls } from "@/components/element-controls";
import { RatioSelector } from "@/components/ratio-selector";
import type { CanvasElement, AspectRatio } from "@/types/index";
import { cn } from "@/lib/utils";

interface EditorProps {
	elements: CanvasElement[];
	setElements: (elements: CanvasElement[]) => void;
	aspectRatio: AspectRatio;
	setAspectRatio: (ratio: AspectRatio) => void;
	backgroundColor: string;
	setBackgroundColor: (color: string) => void;
	overlayColor?: string;
	overlayOpacity?: number;
	setOverlayColor?: (color: string) => void;
	setOverlayOpacity?: (opacity: number) => void;
	selectedElement: string | null;
	setSelectedElement: (id: string | null) => void;
}

export function Editor({
	elements,
	setElements,
	aspectRatio,
	setAspectRatio,
	backgroundColor,
	overlayColor,
	overlayOpacity,
	selectedElement,
	setSelectedElement,
}: EditorProps) {
	const [showControls, setShowControls] = useState(false);
	const [activeMenu, setActiveMenu] = useState<"text" | "resize" | null>(
		null
	);

	const addText = (variant: "h1" | "h2" | "h3" | "h4" | "p") => {
		// Calculate center based on aspect ratio
		const dimensions = {
			"1:1": { width: 1080, height: 1080 },
			"4:5": { width: 1080, height: 1350 },
			"9:16": { width: 1080, height: 1920 },
			"16:9": { width: 1920, height: 1080 },
		}[aspectRatio];

		let styles = {
			fontSize: 32,
			fontWeight: "normal",
			content: "Text",
		};

		switch (variant) {
			case "h1":
				styles = {
					fontSize: 80,
					fontWeight: "800",
					content: "Heading 1",
				};
				break;
			case "h2":
				styles = {
					fontSize: 60,
					fontWeight: "700",
					content: "Heading 2",
				};
				break;
			case "h3":
				styles = {
					fontSize: 40,
					fontWeight: "600",
					content: "Heading 3",
				};
				break;
			case "h4":
				styles = {
					fontSize: 32,
					fontWeight: "600",
					content: "Heading 4",
				};
				break;
			case "p":
				styles = {
					fontSize: 24,
					fontWeight: "400",
					content: "Paragraph",
				};
				break;
		}

		const newElement: CanvasElement = {
			id: Date.now().toString(),
			type: "text",
			content: styles.content,
			x: dimensions.width / 2 - 100, // rough estimate
			y: dimensions.height / 2,
			fontSize: styles.fontSize,
			fontFamily: "Inter",
			fontWeight: styles.fontWeight,
			color: "#000000",
			textAlign: "center",
		};
		// Add to end (top layer)
		setElements([...elements, newElement]);
		setSelectedElement(newElement.id);
		setShowControls(true);
		setActiveMenu(null); // Close menu after adding
	};

	const handleDelete = () => {
		if (selectedElement) {
			setElements(elements.filter((el) => el.id !== selectedElement));
			setSelectedElement(null);
			setShowControls(false);
		}
	};

	const handleClone = () => {
		const element = elements.find((el) => el.id === selectedElement);
		if (element) {
			const newElement = {
				...element,
				id: Date.now().toString(),
				x: element.x + 20,
				y: element.y + 20,
			};
			setElements([...elements, newElement]);
			setSelectedElement(newElement.id);
		}
	};

	const handleMoveLayer = (direction: "up" | "down" | "top" | "bottom") => {
		if (!selectedElement) return;

		const index = elements.findIndex((el) => el.id === selectedElement);
		if (index === -1) return;

		const newElements = [...elements];
		const element = newElements[index];

		// Remove element
		newElements.splice(index, 1);

		if (direction === "top") {
			newElements.push(element);
		} else if (direction === "bottom") {
			newElements.unshift(element);
		} else if (direction === "up") {
			const newIndex = Math.min(newElements.length, index + 1);
			newElements.splice(newIndex, 0, element);
		} else if (direction === "down") {
			const newIndex = Math.max(0, index - 1);
			newElements.splice(newIndex, 0, element);
		}

		setElements(newElements);
	};

	const handleCenterElement = () => {
		if (!selectedElement) return;

		const dimensions = {
			"1:1": { width: 1080, height: 1080 },
			"4:5": { width: 1080, height: 1350 },
			"9:16": { width: 1080, height: 1920 },
			"16:9": { width: 1920, height: 1080 },
		}[aspectRatio];

		setElements(
			elements.map((el) => {
				if (el.id === selectedElement) {
					const updates: Partial<CanvasElement> = {};
					if (el.type === "text") {
						updates.x = dimensions.width / 2; // Alignment logic in canvas handles centering
						updates.y = dimensions.height / 2;
						updates.textAlign = "center";
					} else {
						// For images, center based on width/height
						updates.x = (dimensions.width - (el.width || 0)) / 2;
						updates.y = (dimensions.height - (el.height || 0)) / 2;
					}
					return { ...el, ...updates };
				}
				return el;
			})
		);
	};

	const downloadImage = () => {
		// Deselect before downloading to remove handles
		const prevSelection = selectedElement;
		setSelectedElement(null);

		// Use setTimeout to allow render cycle to clear selection
		setTimeout(() => {
			const canvas = document.getElementById(
				"postCanvas"
			) as HTMLCanvasElement;
			if (canvas) {
				const link = document.createElement("a");
				link.download = `postcraft-${Date.now()}.png`;
				link.href = canvas.toDataURL("image/png", 1.0);
				link.click();

				// Save to designs history
				const designs = JSON.parse(
					localStorage.getItem("savedDesigns") || "[]"
				);
				designs.unshift({
					id: Date.now().toString(),
					thumbnail: canvas.toDataURL("image/png", 0.3),
					elements,
					aspectRatio,
					backgroundColor,
					overlayColor,
					overlayOpacity,
					timestamp: Date.now(),
				});
				localStorage.setItem(
					"savedDesigns",
					JSON.stringify(designs.slice(0, 50))
				);
			}
			// Restore selection if needed, or leave it cleared
		}, 50);
	};

	const clearCanvas = () => {
		if (confirm("Are you sure you want to clear the canvas?")) {
			setElements([]);
			setSelectedElement(null);
		}
	};

	return (
		<div className='flex flex-col h-full bg-gray-50 dark:bg-gray-950'>
			{/* Top Bar: Actions */}
			<div className='h-14 border-b bg-background/95 backdrop-blur px-4 flex items-center justify-between shrink-0 z-10'>
				<Button
					variant='ghost'
					size='sm'
					onClick={clearCanvas}
					className='text-destructive hover:text-destructive hover:bg-destructive/10 h-9 w-9 p-0 md:w-auto md:px-3'
					title='Clear Canvas'>
					<Trash2 className='w-5 h-5 md:mr-2' />
					<span className='hidden md:inline'>Clear</span>
				</Button>

				<span className='font-semibold text-sm md:block text-muted-foreground'>
					PostCraft
				</span>

				<Button
					size='sm'
					onClick={downloadImage}
					className='h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-full'>
					<Download className='w-4 h-4 mr-2' />
					Save
				</Button>
			</div>

			{/* Main Canvas Area */}
			<div
				className='flex-1 min-h-0 relative overflow-hidden flex items-center justify-center p-4 md:p-8'
				onClick={() => setActiveMenu(null)}>
				<Canvas
					elements={elements}
					aspectRatio={aspectRatio}
					backgroundColor={backgroundColor}
					overlayColor={overlayColor}
					overlayOpacity={overlayOpacity}
					selectedElement={selectedElement}
					onSelectElement={(id) => {
						setSelectedElement(id);
						setShowControls(!!id);
						if (id) setActiveMenu(null);
					}}
					onUpdateElements={setElements}
				/>
			</div>

			{/* Bottom Bar: Tools */}
			<div className='bg-background/95 backdrop-blur border-t shrink-0 pb-[env(safe-area-inset-bottom)] relative z-20'>
				{/* Popover Menus */}
				{activeMenu === "text" && (
					<div className='absolute bottom-full left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-b shadow-xl animate-in slide-in-from-bottom-5'>
						<div className='flex flex-col gap-2 max-w-sm mx-auto'>
							<div className='flex items-center justify-between mb-2'>
								<span className='text-sm font-semibold text-muted-foreground'>
									Add Text
								</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-6 w-6'
									onClick={() => setActiveMenu(null)}>
									<X className='w-4 h-4' />
								</Button>
							</div>
							<div className='grid grid-cols-1 gap-2'>
								<Button
									variant='outline'
									className='justify-start h-12 text-left'
									onClick={() => addText("h1")}>
									<Heading1 className='w-5 h-5 mr-3 text-primary' />
									<div className='flex flex-col items-start'>
										<span className='font-bold text-lg leading-none'>
											Add a heading
										</span>
										<span className='text-[10px] text-muted-foreground'>
											Extra Large
										</span>
									</div>
								</Button>
								<Button
									variant='outline'
									className='justify-start h-10 text-left'
									onClick={() => addText("h2")}>
									<Heading2 className='w-4 h-4 mr-3 text-primary' />
									<div className='flex flex-col items-start'>
										<span className='font-bold text-base leading-none'>
											Add a subheading
										</span>
										<span className='text-[10px] text-muted-foreground'>
											Large
										</span>
									</div>
								</Button>
								<Button
									variant='outline'
									className='justify-start h-9 text-left'
									onClick={() => addText("h3")}>
									<Heading3 className='w-4 h-4 mr-3 text-primary' />
									<span className='font-semibold text-sm'>
										Add a small heading
									</span>
								</Button>
								<Button
									variant='outline'
									className='justify-start h-9 text-left'
									onClick={() => addText("p")}>
									<Pilcrow className='w-4 h-4 mr-3 text-primary' />
									<span className='font-normal text-sm'>
										Add a paragraph
									</span>
								</Button>
							</div>
						</div>
					</div>
				)}

				{activeMenu === "resize" && (
					<div className='absolute bottom-full left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-b shadow-xl animate-in slide-in-from-bottom-5'>
						<div className='max-w-md mx-auto'>
							<div className='flex items-center justify-between mb-2 px-1'>
								<span className='text-sm font-semibold text-muted-foreground'>
									Canvas Size
								</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-6 w-6'
									onClick={() => setActiveMenu(null)}>
									<X className='w-4 h-4' />
								</Button>
							</div>
							<RatioSelector
								aspectRatio={aspectRatio}
								onChange={(ratio) => {
									setAspectRatio(ratio);
									// Don't auto close, user might want to try different sizes
								}}
							/>
						</div>
					</div>
				)}

				{/* Tab Bar Buttons */}
				<div className='flex items-center justify-around h-16 px-2 md:justify-center md:gap-12'>
					<Button
						variant='ghost'
						onClick={() =>
							setActiveMenu(
								activeMenu === "resize" ? null : "resize"
							)
						}
						className={cn(
							"flex flex-col gap-1 h-auto py-2 px-6 rounded-xl transition-all",
							activeMenu === "resize"
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:text-foreground hover:bg-muted"
						)}>
						<Layout
							className={cn(
								"w-6 h-6",
								activeMenu === "resize" && "fill-current"
							)}
						/>
						<span className='text-[10px] font-medium'>Resize</span>
					</Button>

					<div className='w-px h-8 bg-border/50' />

					<Button
						onClick={() =>
							setActiveMenu(activeMenu === "text" ? null : "text")
						}
						variant='ghost'
						className={cn(
							"flex flex-col gap-1 h-auto py-2 px-6 rounded-xl transition-all",
							activeMenu === "text"
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:text-foreground hover:bg-muted"
						)}>
						<Type
							className={cn(
								"w-6 h-6",
								activeMenu === "text" && "fill-current"
							)}
						/>
						<span className='text-[10px] font-medium'>Text</span>
					</Button>
				</div>
			</div>

			{showControls &&
				selectedElement &&
				elements.find((e) => e.id === selectedElement) && (
					<ElementControls
						element={
							elements.find((e) => e.id === selectedElement)!
						}
						onUpdate={(updates) => {
							setElements(
								elements.map((el) =>
									el.id === selectedElement
										? { ...el, ...updates }
										: el
								)
							);
						}}
						onDelete={handleDelete}
						onClone={handleClone}
						onMoveLayer={handleMoveLayer}
						onCenter={handleCenterElement}
						onClose={() => {
							setShowControls(false);
							setSelectedElement(null);
						}}
					/>
				)}
		</div>
	);
}
