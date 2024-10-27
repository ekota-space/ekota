import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import { useSWRConfig } from "swr";
import { apiService } from "@/services/api/api";
import type { ApiAuthDaoAuthResponse, ApiAuthDaoLoginDao } from "@/services/api/data-contracts";

export default function useAuthLogin() {
	const { mutate } = useSWRConfig();
	const mutation = useSWRMutation<ApiAuthDaoAuthResponse, AxiosError, string, ApiAuthDaoLoginDao>(
		SwrMutationKeys.useAuthLogin,
		(_, { arg }) => apiService.auth.loginCreate(arg).then((res) => res.data),
	);

	return {
		...mutation,
		trigger: async (data: ApiAuthDaoLoginDao) => {
			await mutation.trigger(data);
			await mutate(SwrQueryKeys.useMe);
		},
	};
}
