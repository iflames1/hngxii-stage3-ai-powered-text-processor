import React from "react";
import { Badge } from "@/components/ui/badge";

interface TranslationProps {
	text: string;
	lang: string;
	getLanguageName: (code: string) => string;
	isTranslating: boolean;
}

export default function Translation({
	text,
	lang,
	getLanguageName,
	isTranslating,
}: TranslationProps) {
	return (
		<>
			<div className="border border-input bg-background shadow-sm rounded-lg p-3 max-w-[80%] w-fit">
				{text}
			</div>
			{!isTranslating && (
				<Badge
					variant="outline"
					className="bg-background text-xs absolute -bottom-2 left-2"
				>
					{getLanguageName(lang)}
				</Badge>
			)}
		</>
	);
}
