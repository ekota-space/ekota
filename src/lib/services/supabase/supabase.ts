import { createClient } from "@supabase/supabase-js";
import env from "~/collection/env";

export default createClient(
	env.supabaseUrl,
	env.supabaseAnonKey,
);
