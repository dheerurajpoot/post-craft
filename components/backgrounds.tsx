"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Upload, Palette } from "lucide-react";
import { ColorPicker } from "@/components/color-picker";
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

export function Backgrounds({ onAddBackground, onSetBackgroundColor }: BackgroundsProps) {
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

	const applyBackgroundColor = () => {
		onSetBackgroundColor(localBackgroundColor);
	};

	return (
		<div className='p-4 space-y-4'>
			<div>
				<h2 className='text-xl font-bold text-foreground mb-1'>
					Backgrounds
				</h2>
				<p className='text-sm text-muted-foreground'>
					Add images or colors as backgrounds
				</p>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<Button
					onClick={() => fileInputRef.current?.click()}
					variant='outline'
					size='sm'>
					<Upload className='w-4 h-4 mr-2' />
					Upload Image
				</Button>
				<Button
					onClick={() => setShowColorPicker(!showColorPicker)}
					variant='outline'
					size='sm'>
					<Palette className='w-4 h-4 mr-2' />
					BG Color
				</Button>
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleImageUpload}
			/>

			{showColorPicker && (
				<div className='space-y-2'>
					<ColorPicker
						color={localBackgroundColor}
						onChange={setLocalBackgroundColor}
						onClose={() => setShowColorPicker(false)}
					/>
					<Button
						onClick={applyBackgroundColor}
						className='w-full'
						size='sm'>
						Apply Background Color
					</Button>
				</div>
			)}

			<form onSubmit={handleSearch} className='flex gap-2'>
				<Input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Search backgrounds...'
					className='flex-1'
				/>
				<Button type='submit' size='icon' disabled={loading}>
					{loading ? (
						<Loader2 className='w-4 h-4 animate-spin' />
					) : (
						<Search className='w-4 h-4' />
					)}
				</Button>
			</form>

			{loading && (
				<div className='flex items-center justify-center py-12'>
					<Loader2 className='w-8 h-8 animate-spin text-primary' />
				</div>
			)}

			<div className='grid grid-cols-2 gap-3'>
				{photos.map((photo) => (
					<Card
						key={photo.id}
						className='overflow-hidden p-0 cursor-pointer hover:shadow-lg transition-shadow'
						onClick={() => addImageToCanvas(photo.src.large)}>
						<img
							src={photo.src.medium || "/placeholder.svg"}
							alt={photo.photographer}
							className='w-full aspect-square object-cover'
						/>
						<div className='p-2 bg-card'>
							<p className='text-xs text-muted-foreground truncate'>
								By {photo.photographer}
							</p>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
