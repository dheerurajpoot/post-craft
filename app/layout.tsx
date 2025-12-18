import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PostCraft - Social Media Post Creator",
	description:
		"Create stunning social media posts with customizable templates and designs",
	icons: {
		icon: [
			{
				url: "/favicon.svg",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon.svg",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/favicon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='initial-scale=1, viewport-fit=cover, width=device-width'></meta>
			</head>
			<body className={`font-sans antialiased`}>{children}</body>
		</html>
	);
}
