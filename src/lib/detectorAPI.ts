export const checkDetectorSupport = () => {
	if ("ai" in self && "languageDetector" in self.ai) return true;
	else return false;
};

export const checkDetectorAvailability = async (): Promise<string> => {
	const detectorCapabilities = await self.ai.languageDetector.capabilities();
	return detectorCapabilities.available;
};

export const checkDetectorGivenAvailability = async (
	sourceLanguage: string
) => {
	const detectorCapabilities = await self.ai.languageDetector.capabilities();
	return detectorCapabilities.languageAvailable(sourceLanguage);
};

export const initLangDetector = async () => {
	const canDetect = await checkDetectorAvailability();
	let detector;
	if (canDetect === "no") {
		console.log("The language detector isn't usable.");
		return null;
	}
	if (canDetect === "readily") {
		console.log("The language detector can immediately be used.");
		detector = await self.ai.languageDetector.create();
		return detector;
	} else {
		console.log("The language detector can be used after model download.");
		detector = await self.ai.languageDetector.create({
			monitor(m: EventTarget) {
				m.addEventListener("downloadprogress", (e: Event) => {
					if ("loaded" in e && "total" in e) {
						console.log(
							`Downloaded ${e.loaded} of ${e.total} bytes.`
						);
					} else
						console.warn(
							"Download progress event missing expected properties."
						);
				});
			},
		});
		return await detector.ready;
	}
};

export const detectLang = async (text: string) => {
	const detector = await initLangDetector();
	if (!detector) return "Language detection is not supported.";
	const results = await detector.detect(text);
	for (const result of results) {
		// Show the full list of potential languages with their likelihood, ranked
		// from most likely to least likely. In practice, one would pick the top
		// language(s) that cross a high enough threshold.
		console.log(result.detectedLanguage, result.confidence);
	}

	return results[0].detectedLanguage;
};
