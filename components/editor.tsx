"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Plus } from "lucide-react";
import { Canvas } from "@/components/canvas";
import { ElementControls } from "@/components/element-controls";
import { RatioSelector } from "@/components/ratio-selector";
import type { CanvasElement, AspectRatio } from "@/types/index";

interface EditorProps {
	elements: CanvasElement[];
	setElements: (elements: CanvasElement[]) => void;
	aspectRatio: AspectRatio;
	setAspectRatio: (ratio: AspectRatio) => void;
	backgroundColor: string;
	setBackgroundColor: (color: string) => void;
	selectedElement: string | null;
	setSelectedElement: (id: string | null) => void;
}

export function Editor({
	elements,
	setElements,
	aspectRatio,
	setAspectRatio,
	backgroundColor,
	selectedElement,
	setSelectedElement,
}: EditorProps) {
	const [showControls, setShowControls] = useState(false);

	const addText = () => {
		// Calculate center based on aspect ratio
		const dimensions = {
			"1:1": { width: 1080, height: 1080 },
			"4:5": { width: 1080, height: 1350 },
			"9:16": { width: 1080, height: 1920 },
			"16:9": { width: 1920, height: 1080 },
		}[aspectRatio];

		const newElement: CanvasElement = {
			id: Date.now().toString(),
			type: "text",
			content: "Double click to edit",
			x: dimensions.width / 2,
			y: dimensions.height / 2,
			fontSize: 60,
			fontFamily: "Inter",
			fontWeight: "bold",
			color: "#000000",
			textAlign: "center",
		};
		// Add to end (top layer)
		setElements([...elements, newElement]);
		setSelectedElement(newElement.id);
		setShowControls(true);
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
						updates.x = dimensions.width / 2;
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
				timestamp: Date.now(),
			});
			localStorage.setItem(
				"savedDesigns",
				JSON.stringify(designs.slice(0, 50))
			);
		}
	};

	const clearCanvas = () => {
		if (confirm("Are you sure you want to clear the canvas?")) {
			setElements([]);
			setSelectedElement(null);
		}
	};

	return (
		<div className='flex flex-col gap-4 p-4 relative h-full'>
			<div className='flex justify-between items-center'>
				<RatioSelector
					aspectRatio={aspectRatio}
					onChange={setAspectRatio}
				/>
				{/* <Button
					variant='ghost'
					size='sm'
					onClick={clearCanvas}
					className='text-destructive hover:text-destructive hover:bg-destructive/10'>
					<Trash2 className='w-4 h-4 mr-2' />
				</Button> */}
			</div>

			<Button
				onClick={addText}
				size='sm'
				variant='outline'
				className='w-full bg-transparent border-dashed'>
				<Plus className='w-4 h-4 mr-2' />
				Add Text
			</Button>

			<div className='flex-1 min-h-0 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 relative'>
				<Canvas
					elements={elements}
					aspectRatio={aspectRatio}
					backgroundColor={backgroundColor}
					selectedElement={selectedElement}
					onSelectElement={(id) => {
						setSelectedElement(id);
						if (id) {
							setShowControls(true);
						} else {
							setShowControls(false);
						}
					}}
					onUpdateElements={setElements}
				/>
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

			<Button onClick={downloadImage} className='w-full' size='lg'>
				<Download className='w-5 h-5 mr-2' />
				Download Post
			</Button>
		</div>
	);
}
