"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Type } from "lucide-react";
import { Canvas } from "@/components/canvas";
import { TextControls } from "@/components/text-controls";
import { RatioSelector } from "@/components/ratio-selector";
import type { CanvasElement, AspectRatio } from "@/types/index";

export function Editor() {
	const [elements, setElements] = useState<CanvasElement[]>([]);
	const [selectedElement, setSelectedElement] = useState<string | null>(null);
	const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [showTextControls, setShowTextControls] = useState(false);

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
			timestamp: Date.now(),
		};
		localStorage.setItem("currentDesign", JSON.stringify(design));
	}, [elements, aspectRatio, backgroundColor]);

	const addText = () => {
		const newElement: CanvasElement = {
			id: Date.now().toString(),
			type: "text",
			content: "Your text here",
			x: 100,
			y: 100,
			fontSize: 32,
			fontFamily: "Inter",
			fontWeight: "bold",
			color: "#000000",
			textAlign: "left",
		};
		setElements([...elements, newElement]);
		setSelectedElement(newElement.id);
		setShowTextControls(true);
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

	return (
		<div className='flex flex-col gap-4 p-4'>
			<RatioSelector
				aspectRatio={aspectRatio}
				onChange={setAspectRatio}
			/>

			<Button
				onClick={addText}
				size='sm'
				variant='outline'
				className='w-full bg-transparent'>
				<Type className='w-4 h-4 mr-2' />
				Add Text
			</Button>

			<Canvas
				elements={elements}
				aspectRatio={aspectRatio}
				backgroundColor={backgroundColor}
				selectedElement={selectedElement}
				onSelectElement={(id) => {
					setSelectedElement(id);
					if (id) {
						const element = elements.find((e) => e.id === id);
						if (element?.type === "text") {
							setShowTextControls(true);
						}
					}
				}}
				onUpdateElements={setElements}
			/>

			{showTextControls && selectedElement && (
				<TextControls
					element={elements.find((e) => e.id === selectedElement)}
					onUpdate={(updates) => {
						setElements(
							elements.map((el) =>
								el.id === selectedElement
									? { ...el, ...updates }
									: el
							)
						);
					}}
					onClose={() => setShowTextControls(false)}
				/>
			)}

			<Button onClick={downloadImage} className='w-full' size='lg'>
				<Download className='w-5 h-5 mr-2' />
				Download Post
			</Button>
		</div>
	);
}
