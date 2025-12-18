"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Upload, Palette } from "lucide-react";
import type { CanvasElement } from "@/types/index";

interface PexelsPhoto {
	id: number;
	src: {
		large: string;
		medium: string;
		small: string;
	};
	photographer: string;
}

interface BackgroundsProps {
	onAddBackground: (element: CanvasElement) => void;
	onSetBackgroundColor: (color: string) => void;
}

export function Backgrounds({
	onAddBackground,
	onSetBackgroundColor,
}: BackgroundsProps) {
	const [query, setQuery] = useState("abstract background");
	const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
	const [loading, setLoading] = useState(false);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [localBackgroundColor, setLocalBackgroundColor] = useState("#ffffff");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const searchImages = async (searchQuery: string) => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=20`,
				{
					headers: {
						Authorization:
							"ifF2mMPT7lt5iXPVfl8nucxMpWcCYN3exJCKNEcySt34gya7mnOJNA3w",
					},
				}
			);
			const data = await response.json();
			setPhotos(data.photos || []);
		} catch (error) {
			console.error("Error fetching images:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		searchImages("abstract background");
	}, []);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			searchImages(query);
		}
	};

	const addImageToCanvas = (imageUrl: string) => {
		const newElement: CanvasElement = {
			id: Date.now().toString(),
			type: "image",
			src: imageUrl,
			x: 50,
			y: 50,
			width: 400,
			height: 400,
		};
		onAddBackground(newElement);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const newElement: CanvasElement = {
					id: Date.now().toString(),
					type: "image",
					src: event.target?.result as string,
					x: 50,
					y: 50,
					width: 400,
					height: 400,
				};
				onAddBackground(newElement);
			};
			reader.readAsDataURL(file);
		}
	};

	const presetColors = [
		"#ffffff",
		"#000000",
		"#F8F9FA",
		"#212529", // Mono
		"#FF6B6B",
		"#FA5252",
		"#F03E3E", // Red
		"#FCC419",
		"#FAB005",
		"#FD7E14", // Yellow/Orange
		"#51CF66",
		"#40C057",
		"#2F9E44", // Green
		"#339AF0",
		"#228BE6",
		"#1C7ED6", // Blue
		"#845EF7",
		"#7950F2",
		"#7048E8", // Purple
		"#F06595",
		"#E64980",
		"#D6336C", // Pink
	];

	return (
		<div className='p-4 space-y-6 h-full overflow-y-auto pb-20'>
			<div>
				<h2 className='text-xl font-bold text-foreground mb-1'>
					Backgrounds
				</h2>
				<p className='text-sm text-muted-foreground'>
					Pick a color or image
				</p>
			</div>

			{/* Colors Section */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<h3 className='text-sm font-semibold text-foreground/80'>
						Colors
					</h3>
					<div className='relative'>
						<input
							type='color'
							value={localBackgroundColor}
							onChange={(e) => {
								setLocalBackgroundColor(e.target.value);
								onSetBackgroundColor(e.target.value);
							}}
							className='absolute inset-0 opacity-0 cursor-pointer w-full h-full'
						/>
						<Button
							variant='ghost'
							size='sm'
							className='h-6 text-xs px-2 gap-1 bg-muted/50'>
							<Palette className='w-3 h-3' />
							Custom
						</Button>
					</div>
				</div>
				<div className='flex flex-wrap gap-2'>
					{presetColors.map((color) => (
						<button
							key={color}
							onClick={() => onSetBackgroundColor(color)}
							className='w-8 h-8 rounded-full border border-border shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
							style={{ backgroundColor: color }}
							title={color}
						/>
					))}
				</div>
			</div>

			{/* Images Section */}
			<div className='space-y-3'>
				<div className='flex items-center justify-between'>
					<h3 className='text-sm font-semibold text-foreground/80'>
						Images
					</h3>
					<Button
						onClick={() => fileInputRef.current?.click()}
						variant='ghost'
						size='sm'
						className='h-6 text-xs px-2 gap-1 bg-muted/50'>
						<Upload className='w-3 h-3' />
						Upload
					</Button>
				</div>

				<form onSubmit={handleSearch} className='flex gap-2'>
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Search photos...'
						className='h-9 bg-muted/30'
					/>
					<Button
						type='submit'
						size='icon'
						className='h-9 w-9'
						disabled={loading}>
						{loading ? (
							<Loader2 className='w-4 h-4 animate-spin' />
						) : (
							<Search className='w-4 h-4' />
						)}
					</Button>
				</form>

				{loading && (
					<div className='flex items-center justify-center py-8'>
						<Loader2 className='w-8 h-8 animate-spin text-primary' />
					</div>
				)}

				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
					{photos.map((photo) => (
						<div
							key={photo.id}
							className='relative group overflow-hidden rounded-xl cursor-pointer bg-muted aspect-square'
							onClick={() => addImageToCanvas(photo.src.large)}>
							<img
								src={photo.src.medium || "/placeholder.svg"}
								alt='Background'
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors' />
						</div>
					))}
				</div>
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleImageUpload}
			/>
		</div>
	);
}
