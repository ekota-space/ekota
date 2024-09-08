import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import type { RegisterUserInput } from "@/services/api/auth";
import { apiService } from "@/services/api/api";
import { useSWRConfig } from "swr";

export default function useAuthRegister() {
	const { mutate } = useSWRConfig();
	const mutation = useSWRMutation<void, AxiosError, string, RegisterUserInput>(
		SwrMutationKeys.useAuthRegister,
		(_, { arg }) => apiService.auth.register(arg),
	);

	return {
		...mutation,
		trigger: async (data: RegisterUserInput) => {
			await mutation.trigger(data);
			await mutate(SwrQueryKeys.useMe);
		},
	};
}
