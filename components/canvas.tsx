"use client";

import React, { useEffect, useRef, useState } from "react";
import type { CanvasElement, AspectRatio } from "@/types/index";

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

const HANDLE_SIZE = 16; // Visual size
const TOUCH_TARGET_SIZE = 32; // Touch area size

export function Canvas({
	elements,
	aspectRatio,
	backgroundColor,
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

	// Update scale and canvas size
	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const dimensions = ASPECT_RATIOS[aspectRatio];
		canvas.width = dimensions.width;
		canvas.height = dimensions.height;

		const updateScale = () => {
			if (!container) return;
			const containerWidth = container.clientWidth;
			const containerHeight = container.clientHeight;

			// Add some padding for handles to be visible
			const padding = 40;
			const availableWidth = containerWidth - padding;
			const availableHeight = containerHeight - padding;

			const scaleX = availableWidth / dimensions.width;
			const scaleY = availableHeight / dimensions.height;
			const newScale = Math.min(scaleX, scaleY);

			setScale(newScale);
		};

		// Initial scale
		updateScale();

		// Update on resize
		const observer = new ResizeObserver(updateScale);
		observer.observe(container);

		return () => observer.disconnect();
	}, [aspectRatio]);

	// Render loop (Draws content ONLY, no handles)
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		// Clear canvas
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Render elements
		elements.forEach((element) => {
			ctx.save();

			if (element.type === "text") {
				ctx.fillStyle = element.color || "#000000";
				ctx.font = `${element.fontStyle || ""} ${
					element.fontWeight || "normal"
				} ${element.fontSize}px ${element.fontFamily || "Inter"}`;
				ctx.textAlign =
					(element.textAlign as CanvasTextAlign) || "left";
				ctx.textBaseline = "top";

				const bounds = getTextBounds(ctx, element);
				bounds.lines.forEach((line, index) => {
					ctx.fillText(
						line,
						element.x,
						element.y + index * bounds.lineHeight
					);
				});
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

					// Per-Image Overlay
					if (element.overlayColor && element.overlayOpacity) {
						ctx.save();
						ctx.globalAlpha = element.overlayOpacity;
						ctx.fillStyle = element.overlayColor;
						ctx.fillRect(
							element.x,
							element.y,
							element.width || 200,
							element.height || 200
						);
						ctx.restore();
					}
				}
			}
			ctx.restore();
		});
	}, [elements, aspectRatio, backgroundColor, imageCache]);

	// --- Interaction Handlers ---

	const getPointerPos = (
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>
	) => {
		const canvas = canvasRef.current;
		if (!canvas) return { x: 0, y: 0 };
		const rect = canvas.getBoundingClientRect();
		let clientX, clientY;

		if ("touches" in e) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		return {
			x: (clientX - rect.left) / scale,
			y: (clientY - rect.top) / scale,
		};
	};

	// --- Helper to measure and wrap text ---
	const getWrappedText = (
		ctx: CanvasRenderingContext2D,
		element: CanvasElement,
		maxWidth: number
	) => {
		const text = element.content || "";
		const lines = text.split("\n");
		const wrappedLines: string[] = [];

		lines.forEach((line) => {
			const words = line.split(" ");
			let currentLine = words[0];

			for (let i = 1; i < words.length; i++) {
				const word = words[i];
				const width = ctx.measureText(currentLine + " " + word).width;
				if (width < maxWidth) {
					currentLine += " " + word;
				} else {
					wrappedLines.push(currentLine);
					currentLine = word;
				}
			}
			wrappedLines.push(currentLine);
		});

		return wrappedLines;
	};

	// --- Helper to calculate text bounds ---
	const getTextBounds = (
		ctx: CanvasRenderingContext2D,
		element: CanvasElement
	) => {
		ctx.font = `${element.fontStyle || ""} ${
			element.fontWeight || "normal"
		} ${element.fontSize}px ${element.fontFamily || "Inter"}`;

		const padding = 40; // Horizontal padding for canvas edges
		const maxWidth = (canvasRef.current?.width || 1080) - padding;
		const lines = getWrappedText(ctx, element, maxWidth);

		let maxLineWidth = 0;
		lines.forEach((line) => {
			const w = ctx.measureText(line).width;
			if (w > maxLineWidth) maxLineWidth = w;
		});

		const lineHeight = (element.fontSize || 32) * 1.2;
		const totalHeight = lines.length * lineHeight;
		const width = maxLineWidth;
		const height = totalHeight;

		let x = element.x;
		const align = (element.textAlign as CanvasTextAlign) || "left";

		// Alignment logic for the bounding box itself is tricky because
		// x represents the anchor point.
		// If align is center, x is the center of the text block.
		// If align is right, x is the right edge.
		if (align === "center") {
			x = element.x - width / 2;
		} else if (align === "right") {
			x = element.x - width;
		}

		return { x, y: element.y, width, height, lines, lineHeight, maxWidth };
	};

	const handleCanvasStart = (
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>
	) => {
		e.preventDefault(); // Prevent scrolling
		const pos = getPointerPos(e);
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		// Check elements (reverse order for z-index)
		for (let i = elements.length - 1; i >= 0; i--) {
			const element = elements[i];
			if (element.type === "text") {
				const bounds = getTextBounds(ctx, element);
				const padding = 20;

				if (
					pos.x >= bounds.x - padding &&
					pos.x <= bounds.x + bounds.width + padding &&
					pos.y >= bounds.y - padding &&
					pos.y <= bounds.y + bounds.height + padding
				) {
					setDragging(element.id);
					setDragOffset({
						x: pos.x - element.x,
						y: pos.y - element.y,
					});
					onSelectElement(element.id);
					return;
				}
			} else if (element.type === "image") {
				const w = element.width || 200;
				const h = element.height || 200;
				if (
					pos.x >= element.x &&
					pos.x <= element.x + w &&
					pos.y >= element.y &&
					pos.y <= element.y + h
				) {
					setDragging(element.id);
					setDragOffset({
						x: pos.x - element.x,
						y: pos.y - element.y,
					});
					onSelectElement(element.id);
					return;
				}
			}
		}

		onSelectElement(null);
	};

	const handleCanvasMove = (
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>
	) => {
		e.preventDefault();
		if (!dragging) return;

		const pos = getPointerPos(e);
		const updatedElements = elements.map((el) =>
			el.id === dragging
				? {
						...el,
						x: pos.x - dragOffset.x,
						y: pos.y - dragOffset.y,
				  }
				: el
		);
		onUpdateElements(updatedElements);
	};

	const handleCanvasEnd = () => {
		setDragging(null);
	};

	// --- Resize Logic (DOM Handles) ---
	const handleResizeStart = (
		e: React.PointerEvent<HTMLDivElement>,
		direction: string
	) => {
		e.preventDefault();
		e.stopPropagation();
		const elId = selectedElement;
		if (!elId) return;

		const element = elements.find((el) => el.id === elId);
		if (!element) return;

		const target = e.currentTarget;
		target.setPointerCapture(e.pointerId);

		const startX = e.clientX;
		const startY = e.clientY;

		const initialX = element.x;
		const initialY = element.y;
		const initialW = element.width || 200;
		const initialH = element.height || 200;
		const initialFontSize = element.fontSize || 32;

		// Get initial text dimensions for accurate resizing
		let initialTextWidth = 0;
		let initialTextHeight = 0;
		if (element.type === "text") {
			const ctx = canvasRef.current?.getContext("2d");
			if (ctx) {
				const bounds = getTextBounds(ctx, element);
				initialTextWidth = bounds.width;
				initialTextHeight = bounds.height;
			}
		}

		const onPointerMove = (moveEvent: PointerEvent) => {
			moveEvent.preventDefault();

			// Delta in CANVAS COORDINATES
			const deltaX = (moveEvent.clientX - startX) / scale;
			const deltaY = (moveEvent.clientY - startY) / scale;

			const updates: Partial<CanvasElement> = {};

			if (element.type === "image") {
				let newX = initialX;
				let newY = initialY;
				let newW = initialW;
				let newH = initialH;

				if (direction.includes("l")) {
					newX = initialX + deltaX;
					newW = initialW - deltaX;
				}
				if (direction.includes("r")) {
					newW = initialW + deltaX;
				}
				if (direction.includes("t")) {
					newY = initialY + deltaY;
					newH = initialH - deltaY;
				}
				if (direction.includes("b")) {
					newH = initialH + deltaY;
				}

				// Min dimensions
				if (newW < 20) {
					if (direction.includes("l"))
						newX = initialX + initialW - 20;
					newW = 20;
				}
				if (newH < 20) {
					if (direction.includes("t"))
						newY = initialY + initialH - 20;
					newH = 20;
				}

				updates.x = newX;
				updates.y = newY;
				updates.width = newW;
				updates.height = newH;
			} else if (element.type === "text") {
				let scaleW = 1;
				let scaleH = 1;

				if (direction.includes("l")) {
					scaleW = (initialTextWidth - deltaX) / initialTextWidth;
				} else if (direction.includes("r")) {
					scaleW = (initialTextWidth + deltaX) / initialTextWidth;
				}

				if (direction.includes("t")) {
					scaleH = (initialTextHeight - deltaY) / initialTextHeight;
				} else if (direction.includes("b")) {
					scaleH = (initialTextHeight + deltaY) / initialTextHeight;
				}

				// Use the dimension with the largest change to drive the scale
				// This allows natural resizing from any corner/direction
				const devW = Math.abs(scaleW - 1);
				const devH = Math.abs(scaleH - 1);
				// If dragging a corner, usually we want to follow the larger movement
				// But we default to 1 if no change in that direction (e.g. pure vertical drag)
				let scaleFactor = devW > devH ? scaleW : scaleH;

				// Fallback if no change (e.g. click)
				if (scaleFactor <= 0) scaleFactor = 0.1; // Prevent 0 or negative

				updates.fontSize = initialFontSize * scaleFactor;

				// Adjust Y if dragging top to keep bottom fixed
				if (direction.includes("t")) {
					updates.y =
						initialY + initialTextHeight * (1 - scaleFactor);
				}
			}

			onUpdateElements(
				elements.map((el) =>
					el.id === elId ? { ...el, ...updates } : el
				)
			);
		};

		const onPointerUp = (upEvent: PointerEvent) => {
			target.releasePointerCapture(upEvent.pointerId);
			target.removeEventListener("pointermove", onPointerMove);
			target.removeEventListener("pointerup", onPointerUp);
		};

		target.addEventListener("pointermove", onPointerMove);
		target.addEventListener("pointerup", onPointerUp);
	};

	// --- Helper to get selection box geometry ---
	const getSelectionBox = () => {
		if (!selectedElement) return null;
		const el = elements.find((e) => e.id === selectedElement);
		if (!el) return null;

		let x, y, w, h;
		if (el.type === "image") {
			x = el.x;
			y = el.y;
			w = el.width || 200;
			h = el.height || 200;
		} else {
			const canvas = canvasRef.current;
			const ctx = canvas?.getContext("2d");
			if (ctx) {
				const bounds = getTextBounds(ctx, el);
				x = bounds.x;
				y = bounds.y;
				w = bounds.width;
				h = bounds.height;
			} else {
				w = 100;
				h = 50;
				x = el.x;
				y = el.y;
			}
		}

		return { x, y, w, h };
	};

	const box = getSelectionBox();

	const displayDimensions = ASPECT_RATIOS[aspectRatio];
	const displayWidth = displayDimensions.width * scale;
	const displayHeight = displayDimensions.height * scale;

	return (
		<div
			ref={containerRef}
			className='relative w-full h-full flex items-center justify-center touch-none'>
			<div
				style={{
					width: displayWidth,
					height: displayHeight,
					position: "relative",
				}}
				className='shadow-2xl'>
				<canvas
					id='postCanvas'
					ref={canvasRef}
					className='w-full h-full bg-white touch-none'
					onMouseDown={handleCanvasStart}
					onMouseMove={handleCanvasMove}
					onMouseUp={handleCanvasEnd}
					onMouseLeave={handleCanvasEnd}
					onTouchStart={handleCanvasStart}
					onTouchMove={handleCanvasMove}
					onTouchEnd={handleCanvasEnd}
				/>

				{/* Selection Overlay */}
				{box && selectedElement && (
					<div
						className='absolute pointer-events-none border-2 border-primary z-10'
						style={{
							left: box.x * scale,
							top: box.y * scale,
							width: box.w * scale,
							height: box.h * scale,
						}}>
						{/* Handles */}
						{[
							{
								pos: "tl",
								x: -HANDLE_SIZE / 2,
								y: -HANDLE_SIZE / 2,
								cursor: "nwse-resize",
							},
							{
								pos: "tr",
								x: "100%",
								y: -HANDLE_SIZE / 2,
								cursor: "nesw-resize",
								offsetX: -HANDLE_SIZE / 2,
							},
							{
								pos: "bl",
								x: -HANDLE_SIZE / 2,
								y: "100%",
								cursor: "nesw-resize",
								offsetY: -HANDLE_SIZE / 2,
							},
							{
								pos: "br",
								x: "100%",
								y: "100%",
								cursor: "nwse-resize",
								offsetX: -HANDLE_SIZE / 2,
								offsetY: -HANDLE_SIZE / 2,
							},
						].map((handle) => (
							<div
								key={handle.pos}
								className='absolute bg-white border border-primary rounded-full shadow-sm pointer-events-auto flex items-center justify-center'
								style={{
									left: handle.x,
									top: handle.y,
									marginLeft: handle.offsetX || 0,
									marginTop: handle.offsetY || 0,
									width: HANDLE_SIZE,
									height: HANDLE_SIZE,
									cursor: handle.cursor,
									// Increase hit area
								}}
								onPointerDown={(e) =>
									handleResizeStart(e, handle.pos)
								}>
								{/* Invisible larger touch target */}
								<div className='absolute inset-[-10px]' />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
