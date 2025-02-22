"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { checkDetectorSupport, detectLang } from "@/lib/detectorAPI";
import { checkTanslatorSupport, translateFunc } from "@/lib/translationAPI";
import InputArea from "./input-area";
import UserText from "./user-text";

export interface Message {
	text: string;
	id: number;
	detectedLang?: string;
	translations?: { [key: string]: string };
	summarization?: string;
}

export default function Home() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [showTranslateOptions, setShowTranslateOptions] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
	const [isDetecting, setIsDetecting] = useState(false);

	const languages = [
		{ name: "English", code: "en" },
		{ name: "Portuguese", code: "pt" },
		{ name: "Spanish", code: "es" },
		{ name: "Russian", code: "ru" },
		{ name: "Turkish", code: "tr" },
		{ name: "French", code: "fr" },
	];

	const updateMessage = (messageId: number, updates: Partial<Message>) => {
		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === messageId ? { ...msg, ...updates } : msg
			)
		);
	};

	const handleSend = async () => {
		if (!currentMessage.trim()) return;
		setIsDetecting(true);

		const newMessage: Message = {
			text: currentMessage,
			id: Date.now(),
		};

		setMessages((prev) => [...prev, newMessage]);
		setCurrentMessage("");

		if (!checkDetectorSupport()) {
			updateMessage(newMessage.id, {
				detectedLang: "Language detection not supported",
			});
			return;
		}

		const detectedLangCode = await detectLang(newMessage.text);
		const detectedLang =
			languages.find((lang) => lang.code === detectedLangCode)?.name ||
			detectedLangCode;

		updateMessage(newMessage.id, { detectedLang });
		setIsDetecting(false);
	};

	const handleTranslate = (messageId: number) => {
		setSelectedMessage(messageId);
		setShowTranslateOptions(true);
	};

	const handleLanguageSelect = async (
		messageId: number,
		targetLang: string
	) => {
		const message = messages.find((msg) => msg.id === messageId);
		if (!message) return;

		let translatedText: string = "";

		if (!checkTanslatorSupport()) {
			translatedText = "Language translation is not supported";
		} else {
			const detectedLang = languages.find(
				(lang) => lang.name === message.detectedLang
			)?.code;
			if (!detectedLang) {
				translatedText = "Unable to detect language";
			} else {
				translatedText = await translateFunc(
					detectedLang,
					targetLang,
					message.text
				);
			}
		}

		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === messageId
					? {
							...msg,
							translations: {
								...msg.translations,
								[targetLang]: translatedText,
							},
					  }
					: msg
			)
		);
	};

	const getLanguageName = (code: string) => {
		const language = languages.find(
			(lang) => lang.code === code?.toLowerCase()
		);
		return language ? language.name : code;
	};

	return (
		<div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
			<Card className="flex flex-col h-full">
				<CardContent className="flex-1 overflow-y-auto p-4 space-y-4 mb-16">
					{messages.map((message) => (
						<div key={message.id} className="space-y-6">
							<UserText
								message={message}
								isDetecting={isDetecting}
							/>
							<div className="flex gap-2 w-fit rounded-lg">
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
									<div className="grid grid-cols-2 gap-2 mt-2 w-fit">
										{languages.map((lang) => (
											<Button
												key={lang.code}
												variant="outline"
												size="sm"
												className="justify-start"
												onClick={() =>
													handleLanguageSelect(
														message.id,
														lang.code
													)
												}
											>
												{lang.name}
											</Button>
										))}
									</div>
								)}
							{message.translations &&
								Object.entries(message.translations).map(
									([lang, text]) => (
										<div key={lang} className="relative">
											<div className="bg-secondary/20 rounded-lg p-3 max-w-[80%] w-fit">
												{text}
											</div>
											<Badge
												variant="outline"
												className="text-xs absolute -bottom-2 left-2"
											>
												{getLanguageName(lang)}
											</Badge>
										</div>
									)
								)}
						</div>
					))}
				</CardContent>
				<InputArea
					currentMessage={currentMessage}
					setCurrentMessage={setCurrentMessage}
					handleSend={handleSend}
				/>
			</Card>
		</div>
	);
}
