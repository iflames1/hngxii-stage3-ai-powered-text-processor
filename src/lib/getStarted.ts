export const confirmGeminiDownload = async (): Promise<string> => {
	const capabilities = await window.ai.languageModel.capabilities();

	return capabilities.available;
};
