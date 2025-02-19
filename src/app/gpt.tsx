"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Send } from "lucide-react";

export default function ChatInterface() {
	const [messages, setMessages] = useState<
		{ text: string; type: string; language: string }[]
	>([]);
	const [input, setInput] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("en");

	const detectLanguage = async (text: string) => {
		const response = await fetch(
			"https://api.example.com/detect-language",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_KEY}`,
				},
				body: JSON.stringify({ text }),
			}
		);
		const data = await response.json();
		return data.language;
	};

	const summarizeText = async (text: string) => {
		const response = await fetch("https://api.example.com/summarize", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUMMARIZER_KEY}`,
			},
			body: JSON.stringify({ text }),
		});
		const data = await response.json();
		return data.summary;
	};

	const translateText = async (text: string, targetLang: string) => {
		const response = await fetch("https://api.example.com/translate", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSLATOR_KEY}`,
			},
			body: JSON.stringify({ text, targetLang }),
		});
		const data = await response.json();
		return data.translation;
	};

	const handleSend = async () => {
		if (!input.trim()) return;
		const detectedLang = await detectLanguage(input);
		const newMessage = {
			text: input,
			type: "user",
			language: detectedLang,
		};
		setMessages([...messages, newMessage]);
		setInput("");
	};

	return (
		<div className="flex flex-col h-screen p-4 max-w-lg mx-auto">
			<Card className="flex-1 overflow-auto bg-gray-100 rounded-xl p-4">
				<CardContent className="space-y-3">
					{messages.map((msg, index) => (
						<div key={index} className="space-y-1">
							<div
								className={`p-3 rounded-lg max-w-xs ${
									msg.type === "user"
										? "bg-blue-500 text-white self-end"
										: "bg-gray-200"
								}`}
							>
								{msg.text}
							</div>
							<p className="text-sm text-gray-500">
								Detected Language: {msg.language}
							</p>
							{msg.language === "en" && msg.text.length > 150 && (
								<Button onClick={() => summarizeText(msg.text)}>
									Summarize
								</Button>
							)}
							<Select onValueChange={setSelectedLanguage}>
								<SelectItem value="en">English</SelectItem>
								<SelectItem value="pt">Portuguese</SelectItem>
								<SelectItem value="es">Spanish</SelectItem>
								<SelectItem value="ru">Russian</SelectItem>
								<SelectItem value="tr">Turkish</SelectItem>
								<SelectItem value="fr">French</SelectItem>
							</Select>
							<Button
								onClick={() =>
									translateText(msg.text, selectedLanguage)
								}
							>
								Translate
							</Button>
						</div>
					))}
				</CardContent>
			</Card>

			<div className="mt-4 flex gap-2">
				<Textarea
					className="flex-1"
					placeholder="Type a message..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button onClick={handleSend} className="px-4 py-2" size="icon">
					<Send className="w-5 h-5" />
				</Button>
			</div>
		</div>
	);
}
