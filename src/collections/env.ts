export const Env = Object.freeze({
	ZITADEL_CLIENT_ID: process.env.ZITADEL_CLIENT_ID as string,
	ZITADEL_ISSUER: process.env.ZITADEL_ISSUER as string,
	ZITADEL_CLIENT_SECRET: process.env.ZITADEL_CLIENT_SECRET as string,
	ORIGIN: process.env.NEXT_PUBLIC_ORIGIN as string,
});
