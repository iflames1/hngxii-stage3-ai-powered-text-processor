import { FileText, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Message } from "./page";
import { checkSummarizerSupport, summarizeText } from "@/lib/summarizationAPI";

interface ActionButtonsProps {
	message: Message;
	handleTranslate: (messageId: number) => void;
	updateMessage: (messageId: number, updates: Partial<Message>) => void;
}

export default function ActionButtons({
	message,
	handleTranslate,
	updateMessage,
}: ActionButtonsProps) {
	const [isSummarizing, setIsSummarizing] = useState(false);

	const handleSummarize = async () => {
		if (!checkSummarizerSupport()) {
			updateMessage(message.id, {
				summary: "Summarization is not supported",
			});
			return;
		}

		setIsSummarizing(true);
		try {
			const summary = await summarizeText(message.text);
			updateMessage(message.id, { summary });
		} catch (error) {
			console.error("Summarization failed:", error);
			updateMessage(message.id, {
				summary: "Failed to generate summary",
			});
		} finally {
			setIsSummarizing(false);
		}
	};

	return (
		<div className="flex gap-2 w-fit rounded-lg">
			{message.text.length > 150 &&
				(message.detectedLang === "English" ||
					message.detectedLang === "en") && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleSummarize}
						disabled={isSummarizing}
					>
						{isSummarizing ? (
							<>
								<Loader2 className="animate-spin size-3 ml-2" />
								Summarizing
							</>
						) : (
							<>
								<FileText className="w-4 h-4 mr-2" />
								Summarize
							</>
						)}
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
