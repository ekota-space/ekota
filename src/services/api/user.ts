import type { ApiUser } from "@/models/api/user";
import { Endpoint } from "./endpoint";
import type { AxiosError } from "axios";
import { isBrowser } from "@/utils/is-browser";

export default class UserEndpoint extends Endpoint {
	async me(): Promise<{ data?: ApiUser; error?: AxiosError }> {
		try {
			const res = await this.client.get<ApiUser>("/user/me", {
				validateStatus: (status) => status === 200,
			});

			return { data: res.data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	}
}
