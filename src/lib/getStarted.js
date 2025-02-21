export const confirmGeminiDownload = async () =>
	(await ai.languageModel.capabilities()).available;
