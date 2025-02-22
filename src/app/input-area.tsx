import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { SendHorizontal } from "lucide-react";

interface InputAreaProps {
	currentMessage: string;
	setCurrentMessage: (message: string) => void;
	handleSend: () => void;
}

export default function InputArea({
	currentMessage,
	setCurrentMessage,
	handleSend,
}: InputAreaProps) {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="border p-4">
			<div className="p-4 border-t flex gap-2 fixed bottom-0 left-0 right-0 bg-background max-w-2xl mx-auto">
				<Textarea
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Type your message here..."
					rows={1}
				/>
				<Button onClick={handleSend} size="icon" className="shrink-0">
					<SendHorizontal className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
