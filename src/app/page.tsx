"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { checkDetectorSupport, detectLang } from "@/lib/detectorAPI";
import InputArea from "./input-area";
import UserText from "./user-text";
import ActionButtons from "./action-buttons";
import LangOptions from "./lang-options";
import Translation from "./translation";

export interface Message {
	text: string;
	id: number;
	detectedLang?: string;
	translations?: { [key: string]: string };
	summary?: string;
}

export default function Home() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [showTranslateOptions, setShowTranslateOptions] = useState(false);
	const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
	const [isDetecting, setIsDetecting] = useState(false);
	const [isTranslating, setIsTranslating] = useState(false);

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

							<ActionButtons
								message={message}
								handleTranslate={handleTranslate}
								updateMessage={updateMessage}
							/>
							{showTranslateOptions &&
								selectedMessage === message.id && (
									<LangOptions
										languages={languages}
										message={message}
										setIsTranslating={setIsTranslating}
										updateMessage={updateMessage}
										isDetecting={isDetecting}
										messages={messages}
									/>
								)}
							{message.translations &&
								Object.entries(message.translations).map(
									([lang, text]) => (
										<div key={lang} className="relative">
											<Translation
												text={text}
												lang={lang}
												getLanguageName={
													getLanguageName
												}
												isTranslating={isTranslating}
											/>
										</div>
									)
								)}
							{message.summary && (
								<div className="border border-input bg-background shadow-sm rounded-lg p-3 max-w-[80%] w-fit">
									{message.summary}
								</div>
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
