import useSWR from "swr";
import { SwrQueryKeys } from "../keys";
import { apiService } from "@/services/api/api";
import type { ApiModelUsers } from "@/services/api/data-contracts";

export default function useMe() {
	return useSWR<ApiModelUsers>(SwrQueryKeys.useMe, async () => {
		return await apiService.user.getUser().then((res) => res.data.data as ApiModelUsers);
	});
}
