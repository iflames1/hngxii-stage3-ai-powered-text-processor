export const checkDetectorSupport = () => {
	if ("ai" in self && "languageDetector" in self.ai) {
		return "The Language Detector API is supported.";
	}
	return "The Language Detector API is not supported.";
};

export const checkDetectorAvailability = async () => {
	const detectorCapabilities = await self.ai.languageDetector.capabilities();
	return detectorCapabilities.available;
};

export const checkDetectorGivenAvailability = async (sourceLanguage) => {
	const detectorCapabilities = await self.ai.languageDetector.capabilities();
	return detectorCapabilities.languageAvailable(sourceLanguage);
};

export const initLangDetector = async () => {
	//const languageDetectorCapabilities =
	//	await self.ai.languageDetector.capabilities();
	const canDetect = checkDetectorAvailability();
	let detector;
	if (canDetect === "no") {
		console.log("The language detector isn't usable.");
		return;
	}
	if (canDetect === "readily") {
		console.log("The language detector can immediately be used.");
		detector = await self.ai.languageDetector.create();
		return detector;
	} else {
		console.log("The language detector can be used after model download.");
		detector = await self.ai.languageDetector.create({
			monitor(m) {
				m.addEventListener("downloadprogress", (e) => {
					console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
				});
			},
		});
		return await detector.ready;
	}
};

export const detectLang = async (text) => {
	const detector = await initLangDetector();
	for (const result of results) {
		// Show the full list of potential languages with their likelihood, ranked
		// from most likely to least likely. In practice, one would pick the top
		// language(s) that cross a high enough threshold.
		console.log(result.detectedLanguage, result.confidence);
	}

	return await detector.detect(text);
};
