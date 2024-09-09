import { Env } from "@/collections/env";
import axios from "axios";
import AuthEndpoint from "./auth";
import UserEndpoint from "./user";

class ApiService {
	auth!: AuthEndpoint;
	user!: UserEndpoint;

	constructor() {
		this.#onInit();
	}

	async #onInit(): Promise<void> {

		const client = axios.create({
			baseURL: Env.API_URI,
			withCredentials: true,
		});

		this.auth = new AuthEndpoint(client);
		this.user = new UserEndpoint(client);
	}
}

export const apiService = new ApiService();
