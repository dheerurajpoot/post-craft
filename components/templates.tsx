"use client";

import type { CanvasElement, AspectRatio } from "@/types";
import { Badge } from "@/components/ui/badge";

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
	{
		id: "modern-minimalist",
		name: "Modern Minimalist",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#ffffff",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Less is more.",
				x: 540,
				y: 540,
				fontSize: 80,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "- Mies van der Rohe",
				x: 540,
				y: 650,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#666666",
				textAlign: "center",
			},
		],
	},
	{
		id: "dark-neon",
		name: "Cyberpunk",
		category: "Tech",
		aspectRatio: "4:5",
		backgroundColor: "#050505",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "FUTURE",
				x: 540,
				y: 400,
				fontSize: 120,
				fontFamily: "Courier New",
				fontWeight: "bold",
				color: "#00ff9d",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "IS NOW",
				x: 540,
				y: 550,
				fontSize: 120,
				fontFamily: "Courier New",
				fontWeight: "bold",
				color: "#d600ff",
				textAlign: "center",
			},
		],
	},
	{
		id: "bold-statement",
		name: "Bold Statement",
		category: "Promo",
		aspectRatio: "1:1",
		backgroundColor: "#FFD700",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "SALE",
				x: 540,
				y: 300,
				fontSize: 200,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "50% OFF",
				x: 540,
				y: 600,
				fontSize: 100,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
		],
	},
	{
		id: "elegant-serif",
		name: "Elegant Serif",
		category: "Lifestyle",
		aspectRatio: "9:16",
		backgroundColor: "#f5f5f0",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "The Art of Living",
				x: 540,
				y: 800,
				fontSize: 90,
				fontFamily: "Georgia",
				fontWeight: "normal",
				fontStyle: "italic",
				color: "#333333",
				textAlign: "center",
			},
		],
	},
	{
		id: "gradient-vibes",
		name: "Good Vibes",
		category: "Inspo",
		aspectRatio: "4:5",
		backgroundColor: "#ff9a9e",
		backgroundImage:
			"linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Good Vibes Only",
				x: 540,
				y: 675,
				fontSize: 70,
				fontFamily: "Brush Script MT",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
		],
	},
	{
		id: "retro-poster",
		name: "Retro Poster",
		category: "Vintage",
		aspectRatio: "4:5",
		backgroundColor: "#E6D2B5",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "VINTAGE",
				x: 540,
				y: 200,
				fontSize: 100,
				fontFamily: "Times New Roman",
				fontWeight: "bold",
				color: "#4A2C2C",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "COLLECTION",
				x: 540,
				y: 320,
				fontSize: 60,
				fontFamily: "Times New Roman",
				fontWeight: "normal",
				color: "#4A2C2C",
				textAlign: "center",
			},
			{
				id: "t3",
				type: "text",
				content: "EST. 1985",
				x: 540,
				y: 1100,
				fontSize: 40,
				fontFamily: "Courier New",
				fontWeight: "bold",
				color: "#4A2C2C",
				textAlign: "center",
			},
		],
	},
	{
		id: "soft-pastel",
		name: "Soft Pastel",
		category: "Calm",
		aspectRatio: "1:1",
		backgroundColor: "#E0F7FA",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Breathe",
				x: 540,
				y: 540,
				fontSize: 90,
				fontFamily: "Verdana",
				fontWeight: "normal",
				color: "#006064",
				textAlign: "center",
			},
		],
	},
	{
		id: "midnight-thought",
		name: "Midnight",
		category: "Quote",
		aspectRatio: "9:16",
		backgroundColor: "#0f172a",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Stars can't shine without darkness.",
				x: 540,
				y: 960,
				fontSize: 60,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#e2e8f0",
				textAlign: "center",
			},
		],
	},
];

interface TemplatesProps {
	onSelectTemplate: (template: Template) => void;
}

export function Templates({ onSelectTemplate }: TemplatesProps) {
	return (
		<div className='p-4 h-full overflow-y-auto pb-20'>
			<h2 className='text-lg font-bold mb-4'>Templates</h2>
			<div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
				{templates.map((template) => (
					<div
						key={template.id}
						className='break-inside-avoid mb-4'
						onClick={() => onSelectTemplate(template)}>
						<div className='group relative rounded-xl overflow-hidden cursor-pointer bg-muted border border-border shadow-sm hover:shadow-md transition-all duration-300'>
							{/* Preview Container */}
							<div
								className='w-full relative'
								style={{
									aspectRatio: template.aspectRatio.replace(
										":",
										"/"
									),
								}}>
								{/* Background Preview */}
								<div
									className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
									style={{
										backgroundColor:
											template.backgroundColor,
										backgroundImage:
											template.backgroundImage
												? template.backgroundImage.startsWith(
														"linear"
												  )
													? template.backgroundImage
													: `url(${template.backgroundImage})`
												: undefined,
									}}
								/>

								{/* Gradient Overlay for Text Readability */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80' />

								{/* Content Info */}
								<div className='absolute bottom-0 left-0 right-0 p-3 text-white'>
									<h3 className='font-bold text-sm mb-1 leading-tight text-white/90'>
										{template.name}
									</h3>
									<div className='flex items-center justify-between'>
										<Badge
											variant='secondary'
											className='h-5 px-1.5 text-[9px] bg-white/20 text-white border-0 backdrop-blur-md uppercase tracking-wider font-medium hover:bg-white/30'>
											{template.aspectRatio}
										</Badge>
										<span className='text-[9px] text-white/70 uppercase tracking-wider font-medium'>
											{template.category}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
