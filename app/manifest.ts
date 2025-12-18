import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "PostCraft",
		short_name: "PostCraft",
		description: "A tool to create posts with images and text",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/favicon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/favicon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
