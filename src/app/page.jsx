"use client";
import { useEffect, useState } from "react";
import { confirmGeminiDownload } from "../lib/getStarted";
import {
	checkTanslatorSupport,
	checkLanguageAvailability,
	translateFunc,
	lanPairDownloadProgress,
} from "@/lib/translationAPI";
import {
	checkDetectorAvailability,
	checkDetectorGivenAvailability,
	checkDetectorSupport,
	detectLang,
} from "@/lib/detectorAPI";

export default function Home() {
	const [geminiDownload, setGeminiDownload] = useState("");
	const [pairAvailability, setPairAvailability] = useState("");
	const [downloadprogress, setDownloadProgress] = useState("");
	const [translation, setTranslation] = useState("");

	const [detectorAvailability, setDetectorAvailability] = useState("");
	const [givenLangDetect, setGivenLangDetect] = useState("");
	const [detectedLang, setDetectedLang] = useState("");

	const sourceLanguage = "en";
	const targetLanguage = "fr";
	const text = "Where is the next bus stop, please?";

	useEffect(() => {
		setGeminiDownload(confirmGeminiDownload());
		setPairAvailability(
			checkLanguageAvailability(sourceLanguage, targetLanguage)
		);
		setDownloadProgress(
			lanPairDownloadProgress(sourceLanguage, targetLanguage)
		);
		setTranslation(translateFunc(sourceLanguage, targetLanguage, text));
		setDetectorAvailability(checkDetectorAvailability());
		setGivenLangDetect(checkDetectorGivenAvailability(sourceLanguage));
		setDetectedLang(detectLang(text));
	}, [
		confirmGeminiDownload,
		checkLanguageAvailability,
		sourceLanguage,
		targetLanguage,
		lanPairDownloadProgress,
		translateFunc,
		detectLang,
	]);
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2>Get Started</h2>
				<p>
					Confirm Gemini Nano has downloaded and works as intended:{" "}
					<b>{geminiDownload}</b>
				</p>
			</div>
			<div className="space-y-2">
				<h2>Translator API</h2>
				<div className="space-y-1">
					<p>
						Translator API is supported:{" "}
						<b>{checkTanslatorSupport()}</b>
					</p>
					<p>
						Check if language pair({sourceLanguage} =&gt;{" "}
						{targetLanguage}) can be used: <b>{pairAvailability}</b>
					</p>
					<p>
						Language pair({sourceLanguage} =&gt; {targetLanguage})
						download progress: <b>{downloadprogress}</b> somethings
						up with this guy
					</p>
					<p>
						The translation of the text <b>"{text}"</b> from{" "}
						<b>{sourceLanguage}</b> to <b>{targetLanguage}</b> is:{" "}
						<b>{translation}</b>
					</p>
				</div>
			</div>
			<div className="space-y-2">
				<h2>Language Dector API</h2>
				<div className="space-y-1">
					<p>
						Language Detector API is supported:{" "}
						<b>{checkDetectorSupport()}</b>
					</p>
					<p>
						Check if Language Detector is ready to use:{" "}
						<b>{detectorAvailability}</b>
					</p>
					<p>
						Check if <b>{sourceLanguage}</b> can be detected:{" "}
						<b>{givenLangDetect}</b>
					</p>
					<p>
						Detect the lang the text: <b>{text}</b> is written in:{" "}
						<b>{detectedLang}</b>
					</p>
				</div>
			</div>
		</div>
	);
}
