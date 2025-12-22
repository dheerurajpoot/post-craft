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

export const templates: Template[] = [
	{
		id: "hindi-window-quote",
		name: "Window Mood",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#0a1f1c", // Dark greenish
		elements: [
			{
				id: "logo",
				type: "text",
				content: "| PostCraft",
				x: 100,
				y: 80,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "left",
			},
			{
				id: "quote-mark",
				type: "text",
				content: "❝",
				x: 540,
				y: 300,
				fontSize: 120,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t1",
				type: "text",
				content: '"जुल्फ खुली रखती है वो...\nदिल बाँधने के लिए!!"',
				x: 540,
				y: 450,
				fontSize: 60,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "brand",
				type: "text",
				content: "PostCraft",
				x: 540,
				y: 800,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#aaaaaa",
				textAlign: "center",
			},
		],
	},
	{
		id: "hindi-nature-quote",
		name: "Nature Wisdom",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#2c3e50",
		backgroundImage:
			"https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Bird/Nature placeholder
		elements: [
			{
				id: "t1",
				type: "text",
				content: "चाँद हो या सूरज, चमकते सब हैं\nअपना वक़्त आने पर",
				x: 540,
				y: 500,
				fontSize: 55,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "author",
				type: "text",
				content: "— PostCraft",
				x: 540,
				y: 700,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#f0f0f0",
				textAlign: "center",
			},
		],
	},
	{
		id: "hindi-black-minimal",
		name: "Black Minimal",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#000000",
		elements: [
			{
				id: "t1",
				type: "text",
				content:
					"बेवजह दिल पे बोझ न भारी रखिये,\nजिंदगी एक खूबसूरत जंग है\nजारी जारी रखिए",
				x: 540,
				y: 450,
				fontSize: 50,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "author",
				type: "text",
				content: "— PostCraft",
				x: 540,
				y: 750,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#888888",
				textAlign: "center",
			},
		],
	},
	{
		id: "hindi-dark-bold",
		name: "Dark Bold",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#1a1a1a",
		elements: [
			{
				id: "brand",
				type: "text",
				content: "| POSTCRAFT",
				x: 100,
				y: 80,
				fontSize: 20,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "left",
			},
			{
				id: "quote-icon",
				type: "text",
				content: "❝",
				x: 540,
				y: 250,
				fontSize: 80,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t1",
				type: "text",
				content:
					'"मंजिलों से गुमराह भी कर देते है\nकुछ लोग, हर किसी से रास्ता पुछना\nअच्छा नहीं होता।"',
				x: 540,
				y: 400,
				fontSize: 45,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "footer",
				type: "text",
				content: "POSTCRAFT",
				x: 540,
				y: 800,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#666666",
				textAlign: "center",
			},
		],
	},
	{
		id: "hindi-clean-light",
		name: "Clean Light",
		category: "Quote",
		aspectRatio: "1:1",
		backgroundColor: "#e5e5e5",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "अपने लक्ष्य पर नज़र और\nअपनी मेहनत पर विश्वास रखो।",
				x: 540,
				y: 500,
				fontSize: 55,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
			{
				id: "handle",
				type: "text",
				content: "@POSTCRAFT",
				x: 540,
				y: 800,
				fontSize: 24,
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
				y: 550,
				fontSize: 100,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#000000",
				textAlign: "center",
			},
		],
	},
	{
		id: "morning-motivation",
		name: "Morning Rise",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#FF9A9E",
		backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
		elements: [
			{
				id: "mm1",
				type: "text",
				content: "WAKE UP",
				x: 540,
				y: 400,
				fontSize: 100,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "mm2",
				type: "text",
				content: "& BE AWESOME",
				x: 540,
				y: 520,
				fontSize: 80,
				fontFamily: "Brush Script MT",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
		],
	},
	{
		id: "hustle-hard",
		name: "Hustle Hard",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#212121",
		elements: [
			{
				id: "hh1",
				type: "text",
				content: "DREAM",
				x: 540,
				y: 300,
				fontSize: 120,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "hh2",
				type: "text",
				content: "BIG",
				x: 540,
				y: 420,
				fontSize: 120,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#f0ad4e",
				textAlign: "center",
			},
			{
				id: "hh3",
				type: "text",
				content: "WORK HARD",
				x: 540,
				y: 650,
				fontSize: 60,
				fontFamily: "Courier New",
				fontWeight: "normal",
				color: "#cccccc",
				textAlign: "center",
			},
		],
	},
	{
		id: "nature-vibes",
		name: "Nature Vibes",
		category: "Quote",
		aspectRatio: "9:16",
		backgroundColor: "#a8e063",
		backgroundImage: "linear-gradient(to top, #56ab2f 0%, #a8e063 100%)",
		elements: [
			{
				id: "nv1",
				type: "text",
				content: "Nature",
				x: 540,
				y: 600,
				fontSize: 140,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "nv2",
				type: "text",
				content: "is not a place to visit.",
				x: 540,
				y: 750,
				fontSize: 50,
				fontFamily: "Verdana",
				fontWeight: "normal",
				color: "#f0f0f0",
				textAlign: "center",
			},
			{
				id: "nv3",
				type: "text",
				content: "It is home.",
				x: 540,
				y: 820,
				fontSize: 50,
				fontFamily: "Verdana",
				fontWeight: "normal",
				color: "#f0f0f0",
				textAlign: "center",
			},
		],
	},
	{
		id: "focus-power",
		name: "Focus Power",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#485563",
		backgroundImage: "linear-gradient(to top, #29323c 0%, #485563 100%)",
		elements: [
			{
				id: "fp1",
				type: "text",
				content: "STAY",
				x: 540,
				y: 350,
				fontSize: 150,
				fontFamily: "Trebuchet MS",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "fp2",
				type: "text",
				content: "FOCUSED",
				x: 540,
				y: 500,
				fontSize: 150,
				fontFamily: "Trebuchet MS",
				fontWeight: "bold",
				color: "#00d2ff",
				textAlign: "center",
			},
		],
	},
	{
		id: "believe-achieve",
		name: "Believe",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#fbc2eb",
		backgroundImage: "linear-gradient(to top, #a6c1ee 0%, #fbc2eb 100%)",
		elements: [
			{
				id: "ba1",
				type: "text",
				content: "Believe",
				x: 540,
				y: 450,
				fontSize: 130,
				fontFamily: "Brush Script MT",
				fontWeight: "normal",
				color: "#333333",
				textAlign: "center",
			},
			{
				id: "ba2",
				type: "text",
				content: "YOU CAN",
				x: 540,
				y: 600,
				fontSize: 90,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#ffffff",
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
	{
		id: "do-it-now",
		name: "Do It Now",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#FF5722",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Don't wait for opportunity.",
				x: 540,
				y: 400,
				fontSize: 60,
				fontFamily: "Inter",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "CREATE IT.",
				x: 540,
				y: 500,
				fontSize: 100,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#FFD600",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 950,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
		],
	},
	{
		id: "no-limits",
		name: "No Limits",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#000000",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "THE ONLY LIMIT",
				x: 540,
				y: 500,
				fontSize: 80,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "IS YOUR MIND",
				x: 540,
				y: 650,
				fontSize: 80,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#00E676",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 1200,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#888888",
				textAlign: "center",
			},
		],
	},
	{
		id: "keep-going",
		name: "Keep Going",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#3F51B5",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Pain is temporary.",
				x: 540,
				y: 450,
				fontSize: 60,
				fontFamily: "Georgia",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "Quitting lasts forever.",
				x: 540,
				y: 550,
				fontSize: 70,
				fontFamily: "Georgia",
				fontWeight: "bold",
				color: "#FF4081",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 950,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#aaaaaa",
				textAlign: "center",
			},
		],
	},
	{
		id: "success-mindset",
		name: "Success Mindset",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#673AB7",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Success is a journey,",
				x: 540,
				y: 500,
				fontSize: 70,
				fontFamily: "Verdana",
				fontWeight: "normal",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "NOT A DESTINATION",
				x: 540,
				y: 650,
				fontSize: 80,
				fontFamily: "Verdana",
				fontWeight: "bold",
				color: "#FFEB3B",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 1200,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#B39DDB",
				textAlign: "center",
			},
		],
	},
	{
		id: "work-hard",
		name: "Work Hard",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#263238",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Work hard in silence.",
				x: 540,
				y: 400,
				fontSize: 60,
				fontFamily: "Courier New",
				fontWeight: "normal",
				color: "#B0BEC5",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "LET SUCCESS BE NOISE",
				x: 540,
				y: 550,
				fontSize: 70,
				fontFamily: "Courier New",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 950,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#546E7A",
				textAlign: "center",
			},
		],
	},
	{
		id: "discipline",
		name: "Discipline",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#009688",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Motivation starts it.",
				x: 540,
				y: 500,
				fontSize: 70,
				fontFamily: "Trebuchet MS",
				fontWeight: "normal",
				color: "#E0F2F1",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "DISCIPLINE KEEPS IT",
				x: 540,
				y: 650,
				fontSize: 80,
				fontFamily: "Trebuchet MS",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 1200,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#80CBC4",
				textAlign: "center",
			},
		],
	},
	{
		id: "fearless",
		name: "Fearless",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#D84315",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "FEAR IS A LIAR",
				x: 540,
				y: 450,
				fontSize: 90,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "Do it anyway.",
				x: 540,
				y: 600,
				fontSize: 60,
				fontFamily: "Brush Script MT",
				fontWeight: "normal",
				color: "#FFCCBC",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 950,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#FFAB91",
				textAlign: "center",
			},
		],
	},
	{
		id: "consistency",
		name: "Consistency",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#1A237E",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "CONSISTENCY",
				x: 540,
				y: 550,
				fontSize: 100,
				fontFamily: "Arial",
				fontWeight: "bold",
				color: "#C5CAE9",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "is the key.",
				x: 540,
				y: 700,
				fontSize: 70,
				fontFamily: "Arial",
				fontWeight: "normal",
				fontStyle: "italic",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 1200,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#7986CB",
				textAlign: "center",
			},
		],
	},
	{
		id: "dream-big",
		name: "Dream Big",
		category: "Motivation",
		aspectRatio: "1:1",
		backgroundColor: "#880E4F",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "If you can dream it,",
				x: 540,
				y: 450,
				fontSize: 60,
				fontFamily: "Times New Roman",
				fontWeight: "normal",
				color: "#F8BBD0",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "YOU CAN DO IT.",
				x: 540,
				y: 550,
				fontSize: 80,
				fontFamily: "Times New Roman",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 950,
				fontSize: 24,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#F48FB1",
				textAlign: "center",
			},
		],
	},
	{
		id: "take-action",
		name: "Take Action",
		category: "Motivation",
		aspectRatio: "4:5",
		backgroundColor: "#BF360C",
		elements: [
			{
				id: "t1",
				type: "text",
				content: "Action is the",
				x: 540,
				y: 500,
				fontSize: 80,
				fontFamily: "Impact",
				fontWeight: "normal",
				color: "#FFCCBC",
				textAlign: "center",
			},
			{
				id: "t2",
				type: "text",
				content: "FOUNDATIONAL KEY",
				x: 540,
				y: 650,
				fontSize: 90,
				fontFamily: "Impact",
				fontWeight: "bold",
				color: "#ffffff",
				textAlign: "center",
			},
			{
				id: "wm",
				type: "text",
				content: "@PostCraft",
				x: 540,
				y: 1200,
				fontSize: 30,
				fontFamily: "Inter",
				fontWeight: "normal",
				color: "#FFAB91",
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
									containerType: "size",
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

								{/* Elements Preview - Scaled to fit */}
								<div className='absolute inset-0 overflow-hidden pointer-events-none'>
									{template.elements.map((el) => {
										const dims = {
											"1:1": { w: 1080, h: 1080 },
											"4:5": { w: 1080, h: 1350 },
											"9:16": { w: 1080, h: 1920 },
											"16:9": { w: 1920, h: 1080 },
										}[template.aspectRatio];

										if (el.type === "text") {
											// Calculate position percentages
											const left = (el.x / dims.w) * 100;
											const top = (el.y / dims.h) * 100;

											// Determine transform based on alignment
											let transform = "translate(0, 0)";
											if (el.textAlign === "center")
												transform =
													"translate(-50%, 0)";
											else if (el.textAlign === "right")
												transform =
													"translate(-100%, 0)";

											return (
												<div
													key={el.id}
													style={{
														position: "absolute",
														left: `${left}%`,
														top: `${top}%`,
														transform,
														width: "auto",
														minWidth: "max-content",
														textAlign:
															el.textAlign as any,
														color: el.color,
														fontFamily:
															el.fontFamily,
														fontWeight:
															el.fontWeight,
														fontStyle: el.fontStyle,
														// Use container query units for responsive font sizing
														fontSize: `${
															((el.fontSize ||
																40) /
																dims.w) *
															100
														}cqw`,
														lineHeight: 1.2,
														whiteSpace: "nowrap",
														textShadow:
															"0 2px 4px rgba(0,0,0,0.1)",
													}}>
													{el.content}
												</div>
											);
										}
										return null;
									})}
								</div>

								{/* Gradient Overlay for Text Readability */}
								<div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80' />

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
