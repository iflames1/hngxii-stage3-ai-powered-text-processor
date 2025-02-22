import { FileText, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Message } from "./page";

interface ActionButtonsProps {
	message: Message;
	handleTranslate: (messageId: number) => void;
}

export default function ActionButtons({
	message,
	handleTranslate,
}: ActionButtonsProps) {
	return (
		<div className="flex gap-2 w-fit rounded-lg">
			{message.text.length > 150 &&
				(message.detectedLang === "English" ||
					message.detectedLang === "en") && (
					<Button variant="outline" size="sm">
						<FileText className="w-4 h-4 mr-2" />
						Summarize
					</Button>
				)}
			<Button
				variant="outline"
				size="sm"
				onClick={() => handleTranslate(message.id)}
			>
				<Languages className="w-4 h-4 mr-2" />
				Translate
			</Button>
		</div>
	);
}
