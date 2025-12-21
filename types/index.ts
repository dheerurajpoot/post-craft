export type AspectRatio = "1:1" | "4:5" | "9:16" | "16:9";

export interface CanvasElement {
	id: string;
	type: "text" | "image";
	x: number;
	y: number;
	// Text properties
	content?: string;
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string;
	fontStyle?: string;
	color?: string;
	textAlign?: string;
	// Image properties
	src?: string;
	width?: number;
	height?: number;
	overlayColor?: string;
	overlayOpacity?: number;
}
