import Dexie, { type EntityTable } from "dexie";

interface ChatMessage {
	text: string;
	id: number;
	detectedLang?: string;
	translations?: { [key: string]: string };
	summary?: string;
}

const db = new Dexie("EventDB") as Dexie & {
	messages: EntityTable<ChatMessage, "id">;
};

db.version(1).stores({
	messages: "++id, text, detectedLang",
});

export type { ChatMessage };
export { db };
