import { Env } from "@/collections/env";
import axios from "axios";
import AuthEndpoint from "./auth";
import UserEndpoint from "./user";
import { isBrowser } from "@/utils/is-browser";

class ApiService {
	auth!: AuthEndpoint;
	user!: UserEndpoint;

	constructor() {
		this.#onInit();
	}

	async #onInit(): Promise<void> {
		const headers = isBrowser()
			? undefined
			: Object.fromEntries(
					await import("next/headers").then((s) => s.headers().entries()),
				);

		const client = axios.create({
			baseURL: Env.API_URI,
			withCredentials: true,
			headers,
		});

		this.auth = new AuthEndpoint(client);
		this.user = new UserEndpoint(client);
	}
}

export const apiService = new ApiService();
