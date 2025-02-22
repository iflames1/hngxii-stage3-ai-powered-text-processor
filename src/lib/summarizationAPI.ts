export const checkSummarizerSupport = () => {
	if ("ai" in self && "summarizer" in self.ai) {
		return true;
	}
	return false;
};

export const checkSummarizerAvailability = async (): Promise<string> => {
	const summarizerAvailability = await self.ai.summarizer.capabilities();
	return summarizerAvailability.available;
};

interface SummarizerOptions {
	type: string;
	format: string;
	length: string;
}

export const initSummarizer = async () => {
	const canSummarize = await checkSummarizerAvailability();
	let summarizer;
	if (canSummarize === "no") {
		console.log("The summarizer isn't usable.");
		return null;
	}

	const options: SummarizerOptions = {
		type: "key-points",
		format: "markdown",
		length: "medium",
	};

	if (canSummarize === "readily") {
		console.log("The summarizer can immediately be used.");
		summarizer = await self.ai.summarizer.create(options);
		return summarizer;
	} else {
		console.log("The summarizer can be used after model download.");
		summarizer = await self.ai.summarizer.create(options);

		summarizer.addEventListener("downloadprogress", (e: Event) => {
			if ("loaded" in e && "total" in e) {
				console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
			} else
				console.warn(
					"Download progress event missing expected properties."
				);
		});
		return await summarizer.ready;
	}
};

export const summarizeText = async (longText: string) => {
	const summarizer = await initSummarizer();
	if (!summarizer) return "Summarization is not supported.";
	return await summarizer.summarize(longText, {
		context: "This article is intended for a normal person",
	});
};
