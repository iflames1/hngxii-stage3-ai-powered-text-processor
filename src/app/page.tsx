"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Languages, FileText } from "lucide-react";

export default function Home() {
	const [messages, setMessages] = useState<{ text: string; id: number }[]>(
		[]
	);
	const [currentMessage, setCurrentMessage] = useState("");
	const [showTranslateOptions, setShowTranslateOptions] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

	const languages = [
		{ name: "English", code: "en" },
		{ name: "Portuguese", code: "pt" },
		{ name: "Spanish", code: "es" },
		{ name: "Russian", code: "ru" },
		{ name: "Turkish", code: "tr" },
		{ name: "French", code: "fr" },
	];

	const handleSend = () => {
		if (currentMessage.trim()) {
			setMessages([
				...messages,
				{ text: currentMessage, id: Date.now() },
			]);
			setCurrentMessage("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const handleTranslate = (messageId: number) => {
		setSelectedMessage(messageId);
		setShowTranslateOptions(true);
	};

	return (
		<div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
			<Card className="flex flex-col h-full">
				<CardContent className="flex-1 overflow-y-auto p-4 space-y-4 mb-16">
					{messages.map((message) => (
						<div key={message.id} className="space-y-2">
							<div className="bg-primary/10 rounded-lg p-3 max-w-[80%] w-fit ml-auto">
								{message.text}
							</div>
							<div className="flex gap-2 bg-secondary w-fit p-3 rounded-lg">
								{message.text.length > 150 && (
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
							{showTranslateOptions &&
								selectedMessage === message.id && (
									<div className="grid grid-cols-2 gap-2 mt-2">
										{languages.map((lang) => (
											<Button
												key={lang.code}
												variant="outline"
												size="sm"
												className="justify-start"
												onClick={() => {
													// Handle translation here
													setShowTranslateOptions(
														false
													);
												}}
											>
												{lang.name}
											</Button>
										))}
									</div>
								)}
						</div>
					))}
				</CardContent>
				<div className="border p-4">
					<div className="p-4 border-t flex gap-2 fixed bottom-0 left-0 right-0 bg-white max-w-2xl mx-auto">
						<Textarea
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
							onKeyDown={handleKeyPress}
							placeholder="Type your message here..."
							rows={1}
						/>
						<Button
							onClick={handleSend}
							size="icon"
							className="shrink-0"
						>
							<SendHorizontal className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}

//const ChatInterface = () => {
//	const [messages, setMessages] = useState<{ text: string; id: number }[]>(
//		[]
//	);
//	const [currentMessage, setCurrentMessage] = useState("");
//	const [showTranslateOptions, setShowTranslateOptions] = useState(false);
//	const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

//	const languages = [
//		{ name: "English", code: "en" },
//		{ name: "Portuguese", code: "pt" },
//		{ name: "Spanish", code: "es" },
//		{ name: "Russian", code: "ru" },
//		{ name: "Turkish", code: "tr" },
//		{ name: "French", code: "fr" },
//	];

//	const handleSend = () => {
//		if (currentMessage.trim()) {
//			setMessages([
//				...messages,
//				{ text: currentMessage, id: Date.now() },
//			]);
//			setCurrentMessage("");
//		}
//	};

//	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//		if (e.key === "Enter" && !e.shiftKey) {
//			e.preventDefault();
//			handleSend();
//		}
//	};

//	const handleTranslate = (messageId: number) => {
//		setSelectedMessage(messageId);
//		setShowTranslateOptions(true);
//	};

//	return (
//		<div className="max-w-2xl mx-auto p-4">
//			<Card className="flex flex-col">
//				<CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
//					{messages.map((message) => (
//						<div key={message.id} className="space-y-2">
//							<div className="bg-primary/10 rounded-lg p-3">
//								{message.text}
//							</div>
//							<div className="flex gap-2">
//								{message.text.length > 150 && (
//									<Button
//										variant="outline"
//										size="sm"
//										disabled
//									>
//										<FileText className="w-4 h-4 mr-2" />
//										Summarize
//									</Button>
//								)}
//								<Button
//									variant="outline"
//									size="sm"
//									onClick={() => handleTranslate(message.id)}
//								>
//									<Languages className="w-4 h-4 mr-2" />
//									Translate
//								</Button>
//							</div>
//							{showTranslateOptions &&
//								selectedMessage === message.id && (
//									<div className="grid grid-cols-2 gap-2 mt-2">
//										{languages.map((lang) => (
//											<Button
//												key={lang.code}
//												variant="outline"
//												size="sm"
//												className="justify-start"
//												onClick={() => {
//													// Handle translation here
//													setShowTranslateOptions(
//														false
//													);
//												}}
//											>
//												{lang.name}
//											</Button>
//										))}
//									</div>
//								)}
//						</div>
//					))}
//				</CardContent>
//				<div className="max-w-2xl  p-4 border-t flex gap-2 fixed bottom-0 left-0 right-0 bg-white">
//					<Textarea
//						value={currentMessage}
//						onChange={(e) => setCurrentMessage(e.target.value)}
//						onKeyDown={handleKeyPress}
//						placeholder="Type your message here..."
//						rows={1}
//					/>
//					<Button
//						onClick={handleSend}
//						size="icon"
//						className="shrink-0"
//					>
//						<SendHorizontal className="h-4 w-4" />
//					</Button>
//				</div>
//			</Card>
//		</div>
//	);
//};

//export default ChatInterface;
