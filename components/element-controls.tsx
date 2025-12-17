"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	ArrowUp,
	ArrowDown,
	Move,
	Type,
	Palette,
	BringToFront,
	SendToBack,
	Bold,
	Italic,
} from "lucide-react";
import type { CanvasElement } from "@/types";
import { cn } from "@/lib/utils";

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
	{ value: "Times New Roman", label: "Times New Roman" },
	{ value: "Courier New", label: "Courier New" },
	{ value: "Verdana", label: "Verdana" },
	{ value: "Comic Sans MS", label: "Comic Sans" },
	{ value: "Impact", label: "Impact" },
	{ value: "Trebuchet MS", label: "Trebuchet" },
	{ value: "Brush Script MT", label: "Brush Script" },
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
		<div className='fixed bottom-16 left-0 right-0 h-auto max-h-[60vh] bg-background/95 backdrop-blur-md border-t border-border shadow-2xl z-50 flex flex-col rounded-t-xl'>
			{/* Handle bar for bottom sheet feel */}
			<div
				className='w-full flex justify-center pt-2 pb-1'
				onClick={onClose}>
				<div className='w-12 h-1.5 bg-muted rounded-full cursor-pointer' />
			</div>

			<div className='flex items-center justify-between px-4 py-2 border-b bg-transparent'>
				<div className='flex items-center gap-2'>
					<h3 className='font-bold text-sm flex items-center gap-2'>
						{element.type === "text" ? (
							<Type className='w-4 h-4' />
						) : (
							<Palette className='w-4 h-4' />
						)}
						Edit {element.type === "text" ? "Text" : "Image"}
					</h3>
				</div>
				<div className='flex gap-1'>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={onClone}
						title='Duplicate'
						className='h-8 w-8 rounded-full hover:bg-muted'>
						<Copy className='w-4 h-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={onDelete}
						title='Delete'
						className='h-8 w-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10'>
						<Trash2 className='w-4 h-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon-sm'
						onClick={onClose}
						className='h-8 w-8 rounded-full hover:bg-muted'>
						<X className='w-4 h-4' />
					</Button>
				</div>
			</div>

			<div className='overflow-y-auto p-4 space-y-6 pb-8'>
				{/* Text Specific Controls */}
				{element.type === "text" && (
					<div className='space-y-4'>
						<div className='space-y-2'>
							<Input
								value={element.content}
								onChange={(e) =>
									onUpdate({ content: e.target.value })
								}
								className='text-lg font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent'
								placeholder='Enter text...'
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-1.5'>
								<Label className='text-xs text-muted-foreground'>
									Font
								</Label>
								<Select
									value={element.fontFamily}
									onValueChange={(value) =>
										onUpdate({ fontFamily: value })
									}>
									<SelectTrigger className='h-9 text-sm'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{FONT_FAMILIES.map((font) => (
											<SelectItem
												key={font.value}
												value={font.value}
												style={{
													fontFamily: font.value,
												}}
												className='text-sm'>
												{font.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-1.5'>
								<Label className='text-xs text-muted-foreground'>
									Size
								</Label>
								<div className='flex items-center gap-2'>
									<Slider
										value={[element.fontSize || 12]}
										min={10}
										max={200}
										step={1}
										onValueChange={(vals) =>
											onUpdate({ fontSize: vals[0] })
										}
										className='flex-1'
									/>
									<span className='text-xs w-8 text-right font-mono'>
										{element.fontSize}
									</span>
								</div>
							</div>
						</div>

						<div className='flex items-center justify-between gap-4'>
							<div className='flex-1 space-y-1.5'>
								<Label className='text-xs text-muted-foreground'>
									Color
								</Label>
								<div className='flex gap-2 items-center'>
									<div className='relative w-8 h-8 rounded-full overflow-hidden border shadow-sm cursor-pointer'>
										<Input
											type='color'
											value={element.color}
											className='absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 cursor-pointer'
											onChange={(e) =>
												onUpdate({
													color: e.target.value,
												})
											}
										/>
									</div>
									<Input
										value={element.color}
										onChange={(e) =>
											onUpdate({ color: e.target.value })
										}
										className='flex-1 h-8 text-xs font-mono uppercase'
									/>
								</div>
							</div>

							<div className='flex-1 space-y-1.5'>
								<Label className='text-xs text-muted-foreground'>
									Style
								</Label>
								<div className='flex gap-1 bg-muted/50 p-1 rounded-lg'>
									<Button
										variant={
											element.fontWeight === "bold"
												? "default"
												: "ghost"
										}
										size='icon-sm'
										onClick={() =>
											onUpdate({
												fontWeight:
													element.fontWeight ===
													"bold"
														? "normal"
														: "bold",
											})
										}
										className='flex-1 h-7 w-auto'>
										<Bold className='w-3.5 h-3.5' />
									</Button>
									<Button
										variant={
											element.fontStyle === "italic"
												? "default"
												: "ghost"
										}
										size='icon-sm'
										onClick={() =>
											onUpdate({
												fontStyle:
													element.fontStyle ===
													"italic"
														? "normal"
														: "italic",
											})
										}
										className='flex-1 h-7 w-auto'>
										<Italic className='w-3.5 h-3.5' />
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className='space-y-4 pt-2 border-t'>
					<Label className='text-xs text-muted-foreground uppercase tracking-wider'>
						Layout & Position
					</Label>

					<div className='grid grid-cols-2 gap-4'>
						{element.type === "text" && (
							<div className='bg-muted/30 p-2 rounded-lg flex justify-between items-center'>
								<span className='text-xs font-medium mr-2'>
									Text Align
								</span>
								<div className='flex gap-1'>
									<Button
										variant={
											element.textAlign === "left"
												? "secondary"
												: "ghost"
										}
										size='icon-sm'
										className='h-7 w-7'
										onClick={() =>
											onUpdate({ textAlign: "left" })
										}>
										<AlignLeft className='w-3.5 h-3.5' />
									</Button>
									<Button
										variant={
											element.textAlign === "center"
												? "secondary"
												: "ghost"
										}
										size='icon-sm'
										className='h-7 w-7'
										onClick={() =>
											onUpdate({ textAlign: "center" })
										}>
										<AlignCenter className='w-3.5 h-3.5' />
									</Button>
									<Button
										variant={
											element.textAlign === "right"
												? "secondary"
												: "ghost"
										}
										size='icon-sm'
										className='h-7 w-7'
										onClick={() =>
											onUpdate({ textAlign: "right" })
										}>
										<AlignRight className='w-3.5 h-3.5' />
									</Button>
								</div>
							</div>
						)}

						<div
							className={cn(
								"bg-muted/30 p-2 rounded-lg flex justify-between items-center",
								element.type !== "text" && "col-span-1"
							)}>
							<span className='text-xs font-medium mr-2'>
								Position
							</span>
							<Button
								variant='ghost'
								size='sm'
								className='h-7 px-2 text-xs gap-1'
								onClick={onCenter}>
								<Move className='w-3 h-3' />
								Center
							</Button>
						</div>

						<div
							className={cn(
								"bg-muted/30 p-2 rounded-lg flex justify-between items-center",
								"col-span-2"
							)}>
							<span className='text-xs font-medium mr-2'>
								Layer Order
							</span>
							<div className='flex gap-1'>
								<Button
									variant='ghost'
									size='icon-sm'
									className='h-7 w-7'
									onClick={() => onMoveLayer("down")}
									title='Move Backward'>
									<ArrowDown className='w-3.5 h-3.5' />
								</Button>
								<Button
									variant='ghost'
									size='icon-sm'
									className='h-7 w-7'
									onClick={() => onMoveLayer("up")}
									title='Move Forward'>
									<ArrowUp className='w-3.5 h-3.5' />
								</Button>
								<Button
									variant='ghost'
									size='icon-sm'
									className='h-7 w-7'
									onClick={() => onMoveLayer("bottom")}
									title='Send to Back'>
									<SendToBack className='w-3.5 h-3.5' />
								</Button>
								<Button
									variant='ghost'
									size='icon-sm'
									className='h-7 w-7'
									onClick={() => onMoveLayer("top")}
									title='Bring to Front'>
									<BringToFront className='w-3.5 h-3.5' />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
