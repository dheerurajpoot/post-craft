"use client";
import { Card } from "@/components/ui/card";
import type { CanvasElement, AspectRatio } from "@/types";

interface Template {
	id: string;
	name: string;
	category: string;
	aspectRatio: AspectRatio;
	backgroundColor: string;
	backgroundImage?: string;
	elements: CanvasElement[];
}

const templates: Template[] = [
	// Iconic Style - Image with overlay text
	{
		id: "iconic-1",
		name: "Iconic Wisdom",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#2C3E50",
		backgroundImage: "/images/iconic.jpg",
		elements: [
			{
				id: "logo-top",
				type: "text",
				content: "QUOTEART",
				x: 100,
				y: 80,
				fontSize: 32,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "left",
			},
			{
				id: "quote-mark",
				type: "text",
				content: "❝❝",
				x: 540,
				y: 280,
				fontSize: 120,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "main-quote",
				type: "text",
				content: "Your Quote Here",
				x: 540,
				y: 500,
				fontSize: 56,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "logo-bottom",
				type: "text",
				content: "QUOTEART",
				x: 540,
				y: 880,
				fontSize: 28,
				fontFamily: "Arial",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
		],
	},
	// Neutral Dark Style
	{
		id: "neutral-dark",
		name: "Neutral Dark",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#1A1A1A",
		backgroundImage: "/images/neutral.png",
		elements: [
			{
				id: "main-text",
				type: "text",
				content: "Your Powerful Quote",
				x: 540,
				y: 480,
				fontSize: 62,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "accent-text",
				type: "text",
				content: "Highlighted Word",
				x: 540,
				y: 560,
				fontSize: 62,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFD700",
				textAlign: "center",
			},
			{
				id: "brand",
				type: "text",
				content: "QUOTEART",
				x: 540,
				y: 720,
				fontSize: 26,
				fontFamily: "Arial",
				fontWeight: "normal",
				color: "#999999",
				textAlign: "center",
			},
		],
	},
	// Minimal Light Style
	{
		id: "minimal-light",
		name: "Minimal Light",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#F5F5F0",
		backgroundImage: "/images/minimal.png",
		elements: [
			{
				id: "quote-text",
				type: "text",
				content: "Simple Yet Powerful Words",
				x: 540,
				y: 480,
				fontSize: 52,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#2D2D2D",
				textAlign: "center",
			},
			{
				id: "attribution",
				type: "text",
				content: "— QuoteArt",
				x: 540,
				y: 640,
				fontSize: 28,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#666666",
				textAlign: "center",
			},
		],
	},
	// Classic Photo Overlay
	{
		id: "classic-photo",
		name: "Classic Photo",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#000000",
		backgroundImage: "/images/classic.jpg",
		elements: [
			{
				id: "main-quote",
				type: "text",
				content: "Inspiring Words Here",
				x: 540,
				y: 480,
				fontSize: 58,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "brand",
				type: "text",
				content: "— QuoteArt",
				x: 540,
				y: 620,
				fontSize: 24,
				fontFamily: "Arial",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
		],
	},
	// Bold Black & Yellow
	{
		id: "bold-accent",
		name: "Bold Statement",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#000000",
		backgroundImage: "/images/bold.png",
		elements: [
			{
				id: "quote",
				type: "text",
				content: "Bold Message Here",
				x: 540,
				y: 480,
				fontSize: 64,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "brand-accent",
				type: "text",
				content: "— QuoteArt",
				x: 540,
				y: 640,
				fontSize: 32,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFD700",
				textAlign: "center",
			},
		],
	},
	// Elegant Simple
	{
		id: "elegant-simple",
		name: "Elegant",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#000000",
		backgroundImage: "/images/elegent.png",
		elements: [
			{
				id: "elegant-quote",
				type: "text",
				content: "Elegant Words of Wisdom",
				x: 540,
				y: 500,
				fontSize: 54,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "brand",
				type: "text",
				content: "— QuoteArt",
				x: 540,
				y: 640,
				fontSize: 26,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#CCCCCC",
				textAlign: "center",
			},
		],
	},
	// Modern Gradient Story
	{
		id: "modern-story",
		name: "Modern Story",
		category: "Quote",
		aspectRatio: "9:16",
		backgroundColor: "#667EEA",
		backgroundImage: "/purple-gradient-abstract-background.jpg",
		elements: [
			{
				id: "top-accent",
				type: "text",
				content: "━━━",
				x: 540,
				y: 600,
				fontSize: 48,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "main-quote",
				type: "text",
				content: "Your Story Matters",
				x: 540,
				y: 900,
				fontSize: 68,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "sub-text",
				type: "text",
				content: "Share it with the world",
				x: 540,
				y: 1050,
				fontSize: 36,
				fontFamily: "Arial",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "bottom-accent",
				type: "text",
				content: "━━━",
				x: 540,
				y: 1300,
				fontSize: 48,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
		],
	},
	// Trendy Neon Vibe
	{
		id: "neon-vibe",
		name: "Neon Vibe",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#0F0F23",
		elements: [
			{
				id: "glow-text",
				type: "text",
				content: "STAY MOTIVATED",
				x: 540,
				y: 480,
				fontSize: 72,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#00F5FF",
				textAlign: "center",
			},
			{
				id: "sub-glow",
				type: "text",
				content: "Keep pushing forward",
				x: 540,
				y: 600,
				fontSize: 36,
				fontFamily: "Arial",
				fontWeight: "normal",
				color: "#FF00FF",
				textAlign: "center",
			},
		],
	},
	// Instagram Feed Style
	{
		id: "insta-feed",
		name: "Feed Post",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#FAFAFA",
		elements: [
			{
				id: "border-box",
				type: "text",
				content: "┌─────────────────┐",
				x: 540,
				y: 300,
				fontSize: 32,
				fontFamily: "Courier New",
				fontWeight: "normal",
				color: "#333333",
				textAlign: "center",
			},
			{
				id: "quote-content",
				type: "text",
				content: "Believe in yourself",
				x: 540,
				y: 500,
				fontSize: 56,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
			{
				id: "border-bottom",
				type: "text",
				content: "└─────────────────┘",
				x: 540,
				y: 700,
				fontSize: 32,
				fontFamily: "Courier New",
				fontWeight: "normal",
				color: "#333333",
				textAlign: "center",
			},
		],
	},
	// Motivational Workout
	{
		id: "workout-motivation",
		name: "Workout Vibes",
		category: "Quote",
		aspectRatio: "4:5",
		backgroundColor: "#FF6B35",
		backgroundImage: "/red-orange-gradient-motivational-background.jpg",
		elements: [
			{
				id: "big-text",
				type: "text",
				content: "NO EXCUSES",
				x: 540,
				y: 600,
				fontSize: 82,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "motivation",
				type: "text",
				content: "Train hard, stay consistent",
				x: 540,
				y: 750,
				fontSize: 38,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
		],
	},
	// Nature Zen
	{
		id: "nature-zen",
		name: "Nature Zen",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#2E8B57",
		backgroundImage: "/green-gradient-nature-background.jpg",
		elements: [
			{
				id: "zen-quote",
				type: "text",
				content: "Find Peace Within",
				x: 540,
				y: 460,
				fontSize: 64,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "zen-sub",
				type: "text",
				content: "Breathe. Relax. Let Go.",
				x: 540,
				y: 580,
				fontSize: 32,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#E8F5E9",
				textAlign: "center",
			},
		],
	},
	// Success Mindset - Updated
	{
		id: "success-mindset",
		name: "Success Path",
		category: "Quote",
		aspectRatio: "9:16",
		backgroundColor: "#FF6B6B",
		backgroundImage: "/red-orange-gradient-motivational-background.jpg",
		elements: [
			{
				id: "success-title",
				type: "text",
				content: "SUCCESS",
				x: 540,
				y: 800,
				fontSize: 90,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#FFFFFF",
				textAlign: "center",
			},
			{
				id: "success-sub",
				type: "text",
				content: "Is A Journey, Not A Destination",
				x: 540,
				y: 950,
				fontSize: 42,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#FFFFFF",
				textAlign: "center",
			},
		],
	},
];

export function Templates() {
	const applyTemplate = (template: Template) => {
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

		const design = {
			elements: imageElement
				? [imageElement, ...template.elements]
				: template.elements,
			aspectRatio: template.aspectRatio,
			backgroundColor: template.backgroundColor,
		};
		localStorage.setItem("currentDesign", JSON.stringify(design));
		window.location.reload();
	};

	return (
		<div className='p-4 space-y-4'>
			<div>
				<h2 className='text-xl font-bold text-foreground mb-1'>
					Templates
				</h2>
				<p className='text-sm text-muted-foreground'>
					Choose a template to start creating your post
				</p>
			</div>

			<div className='grid grid-cols-3 gap-2'>
				{templates.map((template) => (
					<Card
						key={template.id}
						className='overflow-hidden  p-0 cursor-pointer hover:shadow-lg transition-shadow'
						onClick={() => applyTemplate(template)}>
						<div
							className={`${
								template.aspectRatio === "9:16"
									? "aspect-[9/16]"
									: template.aspectRatio === "4:5"
									? "aspect-[4/5]"
									: template.aspectRatio === "16:9"
									? "aspect-[16/9]"
									: "aspect-square"
							} flex items-center justify-center p-2 relative`}
							style={{
								backgroundColor: template.backgroundColor,
							}}>
							{template.backgroundImage && (
								<img
									src={
										template.backgroundImage ||
										"/placeholder.svg"
									}
									alt=''
									className='absolute inset-0 w-full h-full object-cover opacity-70'
								/>
							)}
							<div className='text-center relative z-10'>
								{template.elements.slice(0, 2).map((el) => (
									<div
										key={el.id}
										style={{
											color: el.color,
											fontSize: `${
												(el.fontSize || 40) / 10
											}px`,
											fontWeight: el.fontWeight,
											fontFamily: el.fontFamily,
										}}
										className='truncate max-w-full px-1'>
										{el.content}
									</div>
								))}
							</div>
						</div>
						<div className='p-2 bg-card'>
							<p className='font-medium text-xs text-card-foreground truncate'>
								{template.name}
							</p>
							<p className='text-[10px] text-muted-foreground'>
								{template.aspectRatio}
							</p>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
