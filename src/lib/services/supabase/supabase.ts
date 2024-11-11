import { createClient } from "@supabase/supabase-js";
import env from "~/collection/env";
import type { Database } from "~/collection/types";

export default createClient<Database>(
	env.supabaseUrl,
	env.supabaseAnonKey,
);
