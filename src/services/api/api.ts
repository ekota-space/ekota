import { Env } from "@/collections/env";
import axios from "axios";
import AuthEndpoint from "./auth";
import UserEndpoint from "./user";
import OrganizationEndpoint from "./organization";

class ApiService {
	auth!: AuthEndpoint;
	user!: UserEndpoint;
  organization!: OrganizationEndpoint;

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
    this.organization = new OrganizationEndpoint(client);
	}
}

export const apiService = new ApiService();
