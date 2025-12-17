"use client";

import type { AspectRatio } from "@/types/index";
import { cn } from "@/lib/utils";
import { Square, Smartphone, Monitor, LayoutTemplate } from "lucide-react";

interface RatioSelectorProps {
	aspectRatio: AspectRatio;
	onChange: (ratio: AspectRatio) => void;
}

const ratios: {
	value: AspectRatio;
	label: string;
	icon: React.ComponentType<any>;
}[] = [
	{ value: "1:1", label: "Square", icon: Square },
	{ value: "4:5", label: "Portrait", icon: LayoutTemplate }, // using LayoutTemplate as closest to vertical rectangle
	{ value: "9:16", label: "Story", icon: Smartphone },
	{ value: "16:9", label: "Landscape", icon: Monitor },
];

export function RatioSelector({ aspectRatio, onChange }: RatioSelectorProps) {
	return (
		<div className='w-full overflow-x-auto no-scrollbar py-2'>
			<div className='flex items-center space-x-3 px-1 min-w-max'>
				{ratios.map((ratio) => {
					const Icon = ratio.icon;
					const isSelected = aspectRatio === ratio.value;
					return (
						<button
							key={ratio.value}
							onClick={() => onChange(ratio.value)}
							className={cn(
								"flex flex-col items-center justify-center gap-1.5 rounded-xl px-4 py-2 min-w-[70px] transition-all duration-200 border",
								isSelected
									? "bg-primary text-primary-foreground border-primary shadow-md scale-105 font-medium"
									: "bg-card text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
							)}>
							<Icon
								className={cn(
									"w-5 h-5",
									isSelected ? "stroke-[2.5px]" : "stroke-2"
								)}
							/>
							<span className='text-[10px] leading-none uppercase tracking-wide'>
								{ratio.label}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
