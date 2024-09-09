import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import type { LoginUserInput } from "@/services/api/auth";
import { useSWRConfig } from "swr";
import { apiService } from "@/services/api/api";

export default function useAuthLogin() {
	const { mutate } = useSWRConfig();
	const mutation = useSWRMutation<void, AxiosError, string, LoginUserInput>(
		SwrMutationKeys.useAuthLogin,
		(_, { arg }) => apiService.auth.login(arg),
	);

	return {
		...mutation,
		trigger: async (data: LoginUserInput) => {
			await mutation.trigger(data);
			await mutate(SwrQueryKeys.useMe);
		},
	};
}
