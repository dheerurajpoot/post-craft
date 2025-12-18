"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { CanvasElement } from "@/types";

interface SavedDesign {
	id: string;
	thumbnail: string;
	timestamp: number;
	aspectRatio: string;
	elements: CanvasElement[];
	backgroundColor: string;
}

interface MyDesignsProps {
	onLoadDesign: (design: any) => void;
}

export function MyDesigns({ onLoadDesign }: MyDesignsProps) {
	const [designs, setDesigns] = useState<SavedDesign[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("savedDesigns");
		if (saved) {
			setDesigns(JSON.parse(saved));
		}
	}, []);

	const loadDesign = (design: SavedDesign) => {
		const saved = localStorage.getItem("savedDesigns");
		if (saved) {
			const allDesigns = JSON.parse(saved);
			const fullDesign = allDesigns.find(
				(d: SavedDesign) => d.id === design.id
			);
			if (fullDesign) {
				onLoadDesign(fullDesign);
			}
		}
	};

	const deleteDesign = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		const updated = designs.filter((d) => d.id !== id);
		setDesigns(updated);
		localStorage.setItem("savedDesigns", JSON.stringify(updated));
	};

	return (
		<div className='p-4 h-full overflow-y-auto pb-20'>
			<div className='mb-4'>
				<h2 className='text-xl font-bold text-foreground mb-1'>
					My Designs
				</h2>
				<p className='text-sm text-muted-foreground'>
					Your saved posts ({designs.length})
				</p>
			</div>

			{designs.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-12 text-center'>
					<p className='text-muted-foreground mb-2'>
						No saved designs yet
					</p>
					<p className='text-sm text-muted-foreground'>
						Create and download a post to save it here
					</p>
				</div>
			) : (
				<div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
					{designs.map((design) => (
						<div
							key={design.id}
							className='break-inside-avoid mb-4'
							onClick={() => loadDesign(design)}>
							<div className='group relative rounded-xl overflow-hidden cursor-pointer bg-muted border border-border shadow-sm hover:shadow-md transition-all duration-300'>
								{/* Preview Container */}
								<div
									className='w-full relative'
									style={{
										aspectRatio: design.aspectRatio.replace(
											":",
											"/"
										),
										containerType: "size",
									}}>
									{/* Background Preview */}
									<div
										className='absolute inset-0 bg-cover bg-center'
										style={{
											backgroundColor:
												design.backgroundColor,
										}}
									/>

									{/* Elements Preview - Scaled to fit */}
									<div className='absolute inset-0 overflow-hidden pointer-events-none'>
										{design.elements?.map((el) => {
											const dimMap: Record<
												string,
												{ w: number; h: number }
											> = {
												"1:1": { w: 1080, h: 1080 },
												"4:5": { w: 1080, h: 1350 },
												"9:16": { w: 1080, h: 1920 },
												"16:9": { w: 1920, h: 1080 },
											};
											const dims = dimMap[
												design.aspectRatio
											] || { w: 1080, h: 1080 };

											if (el.type === "text") {
												const left =
													(el.x / dims.w) * 100;
												const top =
													(el.y / dims.h) * 100;

												let transform =
													"translate(0, 0)";
												if (el.textAlign === "center")
													transform =
														"translate(-50%, 0)";
												else if (
													el.textAlign === "right"
												)
													transform =
														"translate(-100%, 0)";

												return (
													<div
														key={el.id}
														style={{
															position:
																"absolute",
															left: `${left}%`,
															top: `${top}%`,
															transform,
															width: "auto",
															minWidth:
																"max-content",
															textAlign:
																el.textAlign as any,
															color: el.color,
															fontFamily:
																el.fontFamily,
															fontWeight:
																el.fontWeight,
															fontStyle:
																el.fontStyle,
															fontSize: `${
																((el.fontSize ||
																	40) /
																	dims.w) *
																100
															}cqw`,
															lineHeight: 1.2,
															whiteSpace:
																"nowrap",
															textShadow:
																"0 2px 4px rgba(0,0,0,0.1)",
														}}>
														{el.content}
													</div>
												);
											}
											if (el.type === "image" && el.src) {
												const left =
													(el.x / dims.w) * 100;
												const top =
													(el.y / dims.h) * 100;
												const width =
													((el.width || 0) / dims.w) *
													100;
												const height =
													((el.height || 0) /
														dims.h) *
													100;

												return (
													<img
														key={el.id}
														src={el.src}
														alt='Element'
														style={{
															position:
																"absolute",
															left: `${left}%`,
															top: `${top}%`,
															width: `${width}%`,
															height: `${height}%`,
															objectFit: "cover",
														}}
													/>
												);
											}
											return null;
										})}
									</div>

									{/* Delete Button - Always visible on mobile/touch, or show on hover */}
									<Button
										size='icon'
										variant='destructive'
										className='absolute top-2 right-2 h-8 w-8 shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10'
										onClick={(e) =>
											deleteDesign(design.id, e)
										}>
										<Trash2 className='w-4 h-4' />
									</Button>

									{/* Info Overlay */}
									<div className='absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent'>
										<p className='text-[10px] text-white/90 font-medium'>
											{new Date(
												design.timestamp
											).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
