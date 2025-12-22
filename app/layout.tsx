import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "PostCraft - Social Media Post Creator",
		template: "%s | PostCraft",
	},
	description:
		"Create stunning social media posts with customizable templates and designs. Free online graphic design tool.",
	applicationName: "PostCraft",
	authors: [{ name: "PostCraft Team" }],
	generator: "Next.js",
	keywords: [
		"social media",
		"post creator",
		"graphic design",
		"instagram posts",
		"facebook posts",
		"marketing",
	],
	referrer: "origin-when-cross-origin",
	creator: "PostCraft",
	publisher: "PostCraft",
	metadataBase: new URL("https://postcraft.app"),
	alternates: {
		canonical: "/",
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "PostCraft - Social Media Post Creator",
		description:
			"Create stunning social media posts with customizable templates and designs",
		url: "https://postcraft.app",
		siteName: "PostCraft",
		images: [
			{
				url: "/postcraft.png",
				width: 1200,
				height: 630,
				alt: "PostCraft Preview",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "PostCraft",
		description:
			"Create stunning social media posts with customizable templates and designs",
		images: ["/postcraft.png"],
		creator: "@postcraft",
	},
	appleWebApp: {
		capable: true,
		title: "PostCraft",
		statusBarStyle: "black-translucent",
		startupImage: [
			"/apple-touch-icon.png",
			{
				url: "/apple-touch-icon.png",
				media: "(device-width: 768px) and (device-height: 1024px)",
			},
		],
	},
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
		<html lang='en' suppressHydrationWarning>
			<head suppressHydrationWarning>
				<meta
					name='viewport'
					content='initial-scale=1, viewport-fit=cover, width=device-width'></meta>
			</head>
			<body className={`font-sans antialiased`} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}
