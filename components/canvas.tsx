"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import type { CanvasElement, AspectRatio } from "@/types";

interface CanvasProps {
	elements: CanvasElement[];
	aspectRatio: AspectRatio;
	backgroundColor: string;
	overlayColor?: string;
	overlayOpacity?: number;
	selectedElement: string | null;
	onSelectElement: (id: string | null) => void;
	onUpdateElements: (elements: CanvasElement[]) => void;
}

const ASPECT_RATIOS = {
	"1:1": { width: 1080, height: 1080 },
	"4:5": { width: 1080, height: 1350 },
	"9:16": { width: 1080, height: 1920 },
	"16:9": { width: 1920, height: 1080 },
};

export function Canvas({
	elements,
	aspectRatio,
	backgroundColor,
	overlayColor,
	overlayOpacity = 0,
	selectedElement,
	onSelectElement,
	onUpdateElements,
}: CanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dragging, setDragging] = useState<string | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [scale, setScale] = useState(1);
	const [imageCache, setImageCache] = useState<
		Record<string, HTMLImageElement>
	>({});

	// Preload images
	useEffect(() => {
		const newCache: Record<string, HTMLImageElement> = { ...imageCache };
		let hasChanges = false;

		elements.forEach((element) => {
			if (
				element.type === "image" &&
				element.src &&
				!newCache[element.src]
			) {
				const img = new Image();
				img.crossOrigin = "anonymous";
				img.src = element.src;
				img.onload = () => {
					// Force re-render when image loads
					setImageCache((prev) => ({ ...prev, [element.src!]: img }));
				};
				newCache[element.src] = img;
				hasChanges = true;
			}
		});

		if (hasChanges) {
			setImageCache(newCache);
		}
	}, [elements]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const dimensions = ASPECT_RATIOS[aspectRatio];
		// Set internal resolution
		canvas.width = dimensions.width;
		canvas.height = dimensions.height;

		// Calculate display dimensions to fit container
		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;

		const scaleX = (containerWidth - 32) / dimensions.width; // 32px padding
		const scaleY = (containerHeight - 32) / dimensions.height;

		const scale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1 if not needed, but usually we scale down. Actually for mobile we might scale down.
		// Actually, we want to fit, so just Math.min(scaleX, scaleY).

		const displayWidth = dimensions.width * scale;
		const displayHeight = dimensions.height * scale;

		canvas.style.width = `${displayWidth}px`;
		canvas.style.height = `${displayHeight}px`;

		setScale(scale);
	}, [aspectRatio]); // window.innerHeight, window.innerWidth Add window resize dependency if possible, or use ResizeObserver. For now simple deps.

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const dimensions = ASPECT_RATIOS[aspectRatio];

		// Clear canvas
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Overlay
		if (overlayColor && overlayOpacity > 0) {
			const prevAlpha = ctx.globalAlpha;
			ctx.globalAlpha = Math.max(0, Math.min(overlayOpacity, 1));
			ctx.fillStyle = overlayColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.globalAlpha = prevAlpha;
		}

		// Render background image elements (id starts with bg-)
		const bgElements = elements.filter(
			(e) => e.type === "image" && (e.id || "").startsWith("bg-")
		);
		bgElements.forEach((element) => {
			const img = imageCache[element.src!];
			if (img && img.complete) {
				ctx.drawImage(
					img,
					element.x,
					element.y,
					element.width || 200,
					element.height || 200
				);
			}
		});

		// Overlay above background images
		if (overlayColor && overlayOpacity > 0) {
			const prevAlpha = ctx.globalAlpha;
			ctx.globalAlpha = Math.max(0, Math.min(overlayOpacity, 1));
			ctx.fillStyle = overlayColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.globalAlpha = prevAlpha;
		}

		// Render remaining elements (text + non-background images)
		const fgElements = elements.filter(
			(e) => !(e.type === "image" && (e.id || "").startsWith("bg-"))
		);
		fgElements.forEach((element) => {
			if (element.type === "text") {
				ctx.fillStyle = element.color || "#000000";
				ctx.font = `${element.fontStyle || ""} ${
					element.fontWeight || "normal"
				} ${element.fontSize}px ${element.fontFamily || "Inter"}`;
				ctx.textAlign =
					(element.textAlign as CanvasTextAlign) || "left";
				ctx.textBaseline = "top";
				ctx.fillText(element.content || "", element.x, element.y);

				// Draw selection border
				if (element.id === selectedElement) {
					const metrics = ctx.measureText(element.content || "");
					const textHeight = element.fontSize || 32;
					ctx.strokeStyle = "#8B5CF6";
					ctx.lineWidth = 3;
					ctx.strokeRect(
						element.x - 5,
						element.y - 5,
						metrics.width + 10,
						textHeight + 10
					);
				}
			} else if (element.type === "image" && element.src) {
				const img = imageCache[element.src];
				if (img && img.complete) {
					ctx.drawImage(
						img,
						element.x,
						element.y,
						element.width || 200,
						element.height || 200
					);

					// Draw selection border
					if (element.id === selectedElement) {
						ctx.strokeStyle = "#8B5CF6";
						ctx.lineWidth = 3;
						ctx.strokeRect(
							element.x - 5,
							element.y - 5,
							(element.width || 200) + 10,
							(element.height || 200) + 10
						);
					}
				}
			}
		});
	}, [elements, aspectRatio, backgroundColor, selectedElement, imageCache]);

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = (e.clientX - rect.left) / scale;
		const y = (e.clientY - rect.top) / scale;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Check if clicking on an element (reverse order to get topmost)
		for (let i = elements.length - 1; i >= 0; i--) {
			const element = elements[i];

			if (element.type === "text") {
				ctx.font = `${element.fontStyle || ""} ${
					element.fontWeight || "normal"
				} ${element.fontSize}px ${element.fontFamily || "Inter"}`;
				const metrics = ctx.measureText(element.content || "");
				const textHeight = element.fontSize || 32;
				const padding = 10; // Add padding for easier selection

				if (
					x >= element.x - padding &&
					x <= element.x + metrics.width + padding &&
					y >= element.y - padding &&
					y <= element.y + textHeight + padding
				) {
					setDragging(element.id);
					setDragOffset({ x: x - element.x, y: y - element.y });
					onSelectElement(element.id);
					return;
				}
			} else if (element.type === "image") {
				if (
					x >= element.x &&
					x <= element.x + (element.width || 200) &&
					y >= element.y &&
					y <= element.y + (element.height || 200)
				) {
					setDragging(element.id);
					setDragOffset({ x: x - element.x, y: y - element.y });
					onSelectElement(element.id);
					return;
				}
			}
		}

		onSelectElement(null);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = (e.clientX - rect.left) / scale;
		const y = (e.clientY - rect.top) / scale;

		// Change cursor if hovering over an element
		let hovering = false;
		const ctx = canvas.getContext("2d");
		if (ctx && !dragging) {
			for (let i = elements.length - 1; i >= 0; i--) {
				const element = elements[i];
				if (element.type === "text") {
					ctx.font = `${element.fontStyle || ""} ${
						element.fontWeight || "normal"
					} ${element.fontSize}px ${element.fontFamily || "Inter"}`;
					const metrics = ctx.measureText(element.content || "");
					const textHeight = element.fontSize || 32;
					const padding = 10;
					if (
						x >= element.x - padding &&
						x <= element.x + metrics.width + padding &&
						y >= element.y - padding &&
						y <= element.y + textHeight + padding
					) {
						hovering = true;
						break;
					}
				} else if (element.type === "image") {
					if (
						x >= element.x &&
						x <= element.x + (element.width || 200) &&
						y >= element.y &&
						y <= element.y + (element.height || 200)
					) {
						hovering = true;
						break;
					}
				}
			}
			canvas.style.cursor = hovering ? "move" : "default";
		}

		if (!dragging) return;

		const updatedElements = elements.map((el) =>
			el.id === dragging
				? { ...el, x: x - dragOffset.x, y: y - dragOffset.y }
				: el
		);
		onUpdateElements(updatedElements);
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	return (
		<div
			ref={containerRef}
			className='relative w-full h-full bg-muted/50 rounded-xl overflow-hidden flex items-center justify-center'>
			<canvas
				id='postCanvas'
				ref={canvasRef}
				className='shadow-2xl cursor-move bg-white'
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			/>
		</div>
	);
}
