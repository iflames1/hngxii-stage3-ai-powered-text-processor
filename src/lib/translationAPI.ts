export const checkTanslatorSupport = () => {
	if ("ai" in self && "translator" in self.ai) {
		return "The Translator API is supported.";
	}
	return "The Translator API is not supported.";
};

export const checkLanguageAvailability = async (
	sourceLanguage: string,
	targetLanguage: string
): Promise<string> => {
	const translatorCapabilities = await self.ai.translator.capabilities();
	return translatorCapabilities.languagePairAvailable(
		sourceLanguage,
		targetLanguage
	);
};

export const lanPairDownloadProgress = async (
	sourceLanguage: string,
	targetLanguage: string
) => {
	const translator = await self.ai.translator.create({
		sourceLanguage,
		targetLanguage,
		monitor(m: EventTarget) {
			m.addEventListener("downloadprogress", (e: Event) => {
				if ("loaded" in e && "total" in e) {
					console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
				} else {
					console.warn(
						"Download progress event missing expected properties."
					);
				}
			});
		},
	});
	translator();
};

export const translateFunc = async (
	sourceLanguage: string,
	targetLanguage: string,
	text: string
): Promise<string> => {
	const translator = await self.ai.translator.create({
		sourceLanguage,
		targetLanguage,
	});
	return await translator.translate(text);
};
