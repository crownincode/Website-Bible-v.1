// src/utils/storage.js
const STORAGE_KEY = "website-bible-tools";

export function getTools() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch (err) {
		console.error("Failed to parse tools from localStorage", err);
		return [];
	}
}

export function saveTools(tools) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
	} catch (err) {
		console.error("Failed to save tools to localStorage", err);
	}
}