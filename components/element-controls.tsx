"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	X,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Trash2,
	Copy,
	Type,
	Palette,
	Bold,
	Italic,
	Move,
} from "lucide-react";
import type { CanvasElement } from "@/types";

interface ElementControlsProps {
	element: CanvasElement;
	onUpdate: (updates: Partial<CanvasElement>) => void;
	onDelete: () => void;
	onClone: () => void;
	onMoveLayer: (direction: "up" | "down" | "top" | "bottom") => void;
	onCenter: () => void;
	onClose: () => void;
}

const FONT_FAMILIES = [
	{ value: "Inter", label: "Inter" },
	{ value: "Arial", label: "Arial" },
	{ value: "Georgia", label: "Georgia" },
	{ value: "Times New Roman", label: "Times" },
	{ value: "Courier New", label: "Courier" },
	{ value: "Verdana", label: "Verdana" },
	{ value: "Comic Sans MS", label: "Comic" },
	{ value: "Impact", label: "Impact" },
];

export function ElementControls({
	element,
	onUpdate,
	onDelete,
	onClone,
	onMoveLayer,
	onCenter,
	onClose,
}: ElementControlsProps) {
	return (
		<div className='fixed bottom-[75px] left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[400px] md:max-w-[600px] bg-background/95 backdrop-blur-md border-t md:border border-border shadow-2xl z-50 flex flex-col md:rounded-xl overflow-hidden transition-all duration-300 pb-[env(safe-area-inset-bottom)]'>
			{/* Compact Header */}
			<div className='flex items-center justify-between px-3 py-1.5 border-b bg-muted/50'>
				<div className='flex items-center gap-2'>
					<span className='text-muted-foreground'>
						{element.type === "text" ? (
							<Type className='w-3 h-3' />
						) : (
							<Palette className='w-3 h-3' />
						)}
					</span>
					<span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
						{element.type === "text" ? "Edit Text" : "Edit Image"}
					</span>
				</div>
				<div className='flex items-center gap-0.5'>
					<Button
						variant='ghost'
						size='icon'
						onClick={onClone}
						className='h-6 w-6 rounded-full hover:bg-muted'
						title='Duplicate'>
						<Copy className='w-3 h-3' />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						onClick={onDelete}
						className='h-6 w-6 rounded-full text-destructive hover:bg-destructive/10'
						title='Delete'>
						<Trash2 className='w-3 h-3' />
					</Button>
					<div className='w-px h-3 bg-border mx-1' />
					<Button
						variant='ghost'
						size='icon'
						onClick={onClose}
						className='h-6 w-6 rounded-full hover:bg-muted'
						title='Close'>
						<X className='w-3.5 h-3.5' />
					</Button>
				</div>
			</div>

			<div className='p-2 md:p-3 space-y-2'>
				{/* Text Controls */}
				{element.type === "text" && (
					<div className='space-y-2'>
						<Textarea
							value={element.content}
							onChange={(e) =>
								onUpdate({ content: e.target.value })
							}
							className='min-h-[60px] text-sm font-medium bg-muted/30 border-transparent focus:border-primary focus:bg-background transition-colors resize-none'
							placeholder='Enter text...'
						/>

						<div className='flex flex-wrap gap-2'>
							{/* Font Family */}
							<Select
								value={element.fontFamily}
								onValueChange={(value) =>
									onUpdate({ fontFamily: value })
								}>
								<SelectTrigger className='h-8 w-[110px] text-xs bg-muted/30 border-transparent'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{FONT_FAMILIES.map((font) => (
										<SelectItem
											key={font.value}
											value={font.value}
											style={{ fontFamily: font.value }}
											className='text-xs'>
											{font.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							{/* Size */}
							<div className='flex items-center gap-2 px-2 bg-muted/30 rounded-md h-8 flex-1 min-w-[120px]'>
								<span className='text-[10px] text-muted-foreground uppercase font-bold'>
									Size
								</span>
								<Slider
									value={[element.fontSize || 12]}
									min={10}
									max={200}
									step={1}
									onValueChange={(vals) =>
										onUpdate({ fontSize: vals[0] })
									}
									className='flex-1 w-20'
								/>
								<span className='text-[10px] w-6 text-right font-mono'>
									{element.fontSize?.toFixed(2)}
								</span>
							</div>

							{/* Color */}
							<div className='flex items-center gap-2 bg-muted/30 rounded-md pl-2 pr-1 h-8'>
								<div className='relative w-4 h-4 rounded-full overflow-hidden border shadow-sm cursor-pointer'>
									<Input
										type='color'
										value={element.color}
										className='absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 cursor-pointer opacity-0'
										onChange={(e) =>
											onUpdate({ color: e.target.value })
										}
									/>
									<div
										className='absolute inset-0 w-full h-full pointer-events-none'
										style={{
											backgroundColor: element.color,
										}}
									/>
								</div>
							</div>
						</div>

						<div className='flex items-center justify-between gap-2'>
							{/* Style Buttons */}
							<div className='flex bg-muted/30 rounded-md p-0.5 gap-0.5'>
								<Button
									variant={
										element.fontWeight === "bold"
											? "secondary"
											: "ghost"
									}
									size='icon'
									onClick={() =>
										onUpdate({
											fontWeight:
												element.fontWeight === "bold"
													? "normal"
													: "bold",
										})
									}
									className='h-7 w-7'>
									<Bold className='w-3 h-3' />
								</Button>
								<Button
									variant={
										element.fontStyle === "italic"
											? "secondary"
											: "ghost"
									}
									size='icon'
									onClick={() =>
										onUpdate({
											fontStyle:
												element.fontStyle === "italic"
													? "normal"
													: "italic",
										})
									}
									className='h-7 w-7'>
									<Italic className='w-3 h-3' />
								</Button>
							</div>

							{/* Alignment */}
							<div className='flex bg-muted/30 rounded-md p-0.5 gap-0.5'>
								<Button
									variant={
										element.textAlign === "left"
											? "secondary"
											: "ghost"
									}
									size='icon'
									onClick={() =>
										onUpdate({ textAlign: "left" })
									}
									className='h-7 w-7'>
									<AlignLeft className='w-3 h-3' />
								</Button>
								<Button
									variant={
										element.textAlign === "center"
											? "secondary"
											: "ghost"
									}
									size='icon'
									onClick={() =>
										onUpdate({ textAlign: "center" })
									}
									className='h-7 w-7'>
									<AlignCenter className='w-3 h-3' />
								</Button>
								<Button
									variant={
										element.textAlign === "right"
											? "secondary"
											: "ghost"
									}
									size='icon'
									onClick={() =>
										onUpdate({ textAlign: "right" })
									}
									className='h-7 w-7'>
									<AlignRight className='w-3 h-3' />
								</Button>
							</div>

							{/* Layer/Move Actions */}
							<div className='flex bg-muted/30 rounded-md p-0.5 gap-0.5 ml-auto'>
								<Button
									variant='ghost'
									size='icon'
									onClick={onCenter}
									className='h-7 w-7'
									title='Center'>
									<Move className='w-3 h-3' />
								</Button>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => onMoveLayer("top")}
									className='h-7 w-auto px-2 text-[10px]'
									title='Bring to Front'>
									Front
								</Button>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => onMoveLayer("bottom")}
									className='h-7 w-auto px-2 text-[10px]'
									title='Send to Back'>
									Back
								</Button>
							</div>
						</div>
					</div>
				)}

				{/* Image Controls */}
				{element.type === "image" && (
					<div className='space-y-2'>
						{/* Size Controls Row */}
						<div className='flex items-center gap-2 bg-muted/30 p-1.5 rounded-md'>
							<Label className='text-[10px] text-muted-foreground uppercase min-w-[40px]'>
								Size
							</Label>
							<div className='flex flex-1 gap-2'>
								<div className='flex items-center gap-1 flex-1'>
									<span className='text-[9px] text-muted-foreground'>
										W
									</span>
									<Slider
										value={[element.width || 200]}
										min={50}
										max={2000}
										step={10}
										onValueChange={(vals) => {
											const newW = vals[0];
											const currW = element.width || 200;
											const dx = (newW - currW) / 2;
											onUpdate({
												width: newW,
												x: (element.x || 0) - dx,
											});
										}}
										className='flex-1'
									/>
								</div>
								<div className='flex items-center gap-1 flex-1'>
									<span className='text-[9px] text-muted-foreground'>
										H
									</span>
									<Slider
										value={[element.height || 200]}
										min={50}
										max={2000}
										step={10}
										onValueChange={(vals) => {
											const newH = vals[0];
											const currH = element.height || 200;
											const dy = (newH - currH) / 2;
											onUpdate({
												height: newH,
												y: (element.y || 0) - dy,
											});
										}}
										className='flex-1'
									/>
								</div>
							</div>
						</div>

						{/* Overlay Controls */}
						<div className='bg-muted/30 p-1.5 rounded-md flex items-center gap-3'>
							<div className='flex items-center gap-2 min-w-fit'>
								<Label className='text-[10px] text-muted-foreground uppercase'>
									Overlay
								</Label>
								<div className='relative w-5 h-5 rounded-full border border-border overflow-hidden cursor-pointer shadow-sm'>
									<input
										type='color'
										value={
											element.overlayColor || "#000000"
										}
										onChange={(e) =>
											onUpdate({
												overlayColor: e.target.value,
											})
										}
										className='absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 opacity-0 cursor-pointer'
									/>
									<div
										className='w-full h-full pointer-events-none'
										style={{
											backgroundColor:
												element.overlayColor ||
												"#000000",
										}}
									/>
								</div>
							</div>

							<div className='flex items-center gap-2 flex-1'>
								<span className='text-[10px] text-muted-foreground whitespace-nowrap'>
									Opacity
								</span>
								<Slider
									value={[
										Math.round(
											((element.overlayOpacity ||
												0) as number) * 100
										),
									]}
									min={0}
									max={100}
									step={1}
									onValueChange={(vals) =>
										onUpdate({
											overlayOpacity:
												(vals[0] || 0) / 100,
										})
									}
									className='flex-1'
								/>
								<span className='text-[10px] font-mono w-6 text-right'>
									{Math.round(
										(element.overlayOpacity || 0) * 100
									)}
									%
								</span>
							</div>
						</div>

						{/* Common Actions */}
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-7 text-[10px] bg-transparent border-dashed'
								onClick={onCenter}>
								<Move className='w-3 h-3 mr-1' /> Center
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-7 text-[10px] bg-transparent border-dashed'
								onClick={() => onMoveLayer("top")}>
								To Front
							</Button>
							<Button
								variant='outline'
								size='sm'
								className='flex-1 h-7 text-[10px] bg-transparent border-dashed'
								onClick={() => onMoveLayer("bottom")}>
								To Back
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
