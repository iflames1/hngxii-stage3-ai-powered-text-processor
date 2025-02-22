import React from "react";
import { Button } from "@/components/ui/button";
import { Message } from "./page";

interface LangOptionsProps {
	languages: { name: string; code: string }[];
	message: Message;
	handleLanguageSelect: (id: number, code: string) => void;
}

export default function LangOptions({
	languages,
	message,
	handleLanguageSelect,
}: LangOptionsProps) {
	return (
		<div className="grid grid-cols-2 gap-2 mt-2 w-fit">
			{languages.map((lang) => (
				<Button
					key={lang.code}
					variant="outline"
					size="sm"
					className="justify-start"
					onClick={() => handleLanguageSelect(message.id, lang.code)}
				>
					{lang.name}
				</Button>
			))}
		</div>
	);
}
