"use client";

import { Button } from "@/components/ui/button";
import type { AspectRatio } from "@/types/index";

interface RatioSelectorProps {
	aspectRatio: AspectRatio;
	onChange: (ratio: AspectRatio) => void;
}

const ratios: { value: AspectRatio; label: string; icon: string }[] = [
	{ value: "1:1", label: "Square", icon: "▢" },
	{ value: "4:5", label: "Portrait", icon: "▭" },
	{ value: "9:16", label: "Story", icon: "▯" },
	{ value: "16:9", label: "Landscape", icon: "▬" },
];

export function RatioSelector({ aspectRatio, onChange }: RatioSelectorProps) {
	return (
		<div className='space-y-2'>
			<h3 className='text-sm font-medium text-muted-foreground'>
				Post Size
			</h3>
			<div className='grid grid-cols-4 gap-2'>
				{ratios.map((ratio) => (
					<Button
						key={ratio.value}
						onClick={() => onChange(ratio.value)}
						variant={
							aspectRatio === ratio.value ? "default" : "outline"
						}
						className='flex flex-col items-center justify-center h-16 p-2'
						size='sm'>
						<span className='text-xl font-bold mb-1'>
							{ratio.icon}
						</span>
						<span className='text-xs'>{ratio.label}</span>
					</Button>
				))}
			</div>
		</div>
	);
}
