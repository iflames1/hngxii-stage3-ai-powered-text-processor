import React from "react";
import { Badge } from "@/components/ui/badge";

interface TranslationProps {
	text: string;
	lang: string;
	getLanguageName: (code: string) => string;
}

export default function Translation({
	text,
	lang,
	getLanguageName,
}: TranslationProps) {
	return (
		<>
			<div className="bg-background rounded-lg p-3 max-w-[80%] w-fit">
				{text}
			</div>
			<Badge
				variant="outline"
				className="text-xs absolute -bottom-2 left-2"
			>
				{getLanguageName(lang)}
			</Badge>
		</>
	);
}
