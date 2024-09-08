import useSWR from "swr";
import { SwrQueryKeys } from "../keys";
import { apiService } from "@/services/api/api";
import type { ApiUser } from "@/models/api/user";

export default function useMe() {
	return useSWR<ApiUser>(SwrQueryKeys.useMe, async () => {
		const res = await apiService.user.me();
		if (res.error) throw res.error;

		return res.data as ApiUser;
	});
}
