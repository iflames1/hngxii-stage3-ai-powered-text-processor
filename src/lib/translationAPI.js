export const checkTanslatorSupport = () => {
	if ("ai" in self && "translator" in self.ai) {
		return "The Translator API is supported.";
	}
	return "The Translator API is not supported.";
};

export const checkLanguageAvailability = async (
	sourceLanguage,
	targetLanguage
) => {
	const translatorCapabilities = await self.ai.translator.capabilities();
	return translatorCapabilities.languagePairAvailable(
		sourceLanguage,
		targetLanguage
	);
};

export const lanPairDownloadProgress = async (
	sourceLanguage,
	targetLanguage
) => {
	const translator = await self.ai.translator.create({
		sourceLanguage,
		targetLanguage,
		monitor(m) {
			m.addEventListener("downloadprogress", (e) => {
				console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
			});
		},
	});
	translator();
};

export const translateFunc = async (sourceLanguage, targetLanguage, text) => {
	const translator = await self.ai.translator.create({
		sourceLanguage,
		targetLanguage,
	});
	await translator.translate(text);
};
