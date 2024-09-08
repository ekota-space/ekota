import type { AxiosInstance } from "axios";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export abstract class Endpoint {
	protected readonly client: AxiosInstance;

	constructor(client: AxiosInstance) {
		this.client = client;
	}

	protected cookiesToString(cookies?: RequestCookie[]): string {
		if (!cookies) {
			return "";
		}

		return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
	}
}
