import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import { apiService } from "@/services/api/api";
import { useSWRConfig } from "swr";
import type { ApiAuthDaoAuthResponse, ApiAuthDaoRegisterDao } from "@/services/api/data-contracts";

export default function useAuthRegister() {
	const { mutate } = useSWRConfig();
	const mutation = useSWRMutation<ApiAuthDaoAuthResponse, AxiosError, string, ApiAuthDaoRegisterDao>(
		SwrMutationKeys.useAuthRegister,
		(_, { arg }) => apiService.auth.registerCreate(arg).then((res) => res.data),
	);

	return {
		...mutation,
		trigger: async (data: ApiAuthDaoRegisterDao) => {
			await mutation.trigger(data);
			await mutate(SwrQueryKeys.useMe);
		},
	};
}
