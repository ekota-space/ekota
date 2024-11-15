import { type ClassValue, clsx } from "clsx";
import ShortUniqueId from "short-unique-id";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const uid = new ShortUniqueId({ length: 10 });

export function generateShortId(): string {
	return uid.rnd();
}
