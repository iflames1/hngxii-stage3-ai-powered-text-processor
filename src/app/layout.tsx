import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Chad AI",
	description: "Chad fave text processor",
	other: {
		"http-equiv": "origin-trial",
		content: process.env.NEXT_PUBLIC_TRANSLATOR_API || "",
		"http-equiv-2": "origin-trial",
		content2: process.env.NEXT_PUBLIC_SUMMARIZATION_API || "",
		"http-equiv-3": "origin-trial",
		content3: process.env.NEXT_PUBLIC_DETECTOR_API || "",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
			>
				{children}
			</body>
		</html>
	);
}
