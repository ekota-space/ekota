import type { PostgrestError } from "@supabase/supabase-js";

export default abstract class PostgresErrors {
	name = "PostgresErrors";

	public static isPostgresError(err: unknown): err is PostgrestError {
		return err instanceof Error && err.name === "PostgrestError";
	}

	public static isDuplicateError(err: unknown): err is PostgrestError  {
		return PostgresErrors.isPostgresError(err) && err.code === "23505";
	}
}
