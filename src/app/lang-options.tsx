import React from "react";
import { Button } from "@/components/ui/button";
import { Message } from "./page";
import { checkTanslatorSupport, translateFunc } from "@/lib/translationAPI";

interface LangOptionsProps {
	languages: { name: string; code: string }[];
	message: Message;
	setIsTranslating: (isTranslating: boolean) => void;
	updateMessage: (messageId: number, updates: Partial<Message>) => void;
	isDetecting: boolean;
	messages: Message[];
}

export default function LangOptions({
	languages,
	message,
	setIsTranslating,
	updateMessage,
	isDetecting,
	messages,
}: LangOptionsProps) {
	const handleLanguageSelect = async (
		messageId: number,
		targetLang: string
	) => {
		const message = messages.find((msg) => msg.id === messageId);
		if (!message) return;

		let translatedText: string = "";

		setIsTranslating(true);

		if (!checkTanslatorSupport()) {
			translatedText = "Language translation is not supported";
		} else {
			if (isDetecting) {
				translatedText =
					"Detecting language, please wait and try again";
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
		}

		updateMessage(message.id, {
			translations: {
				...message.translations,
				[targetLang]: translatedText,
			},
		});

		//setMessages((prev) =>
		//	prev.map((msg) =>
		//		msg.id === messageId
		//			? {
		//					...msg,
		//					translations: {
		//						...msg.translations,
		//						[targetLang]: translatedText,
		//					},
		//			  }
		//			: msg
		//	)
		//);

		if (!isDetecting) setIsTranslating(true);
	};

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
