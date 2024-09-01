import type { AuthOptions, DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Zitadel, { type ZitadelProfile } from "next-auth/providers/zitadel";
import { Issuer } from "openid-client";
import { Env } from "./env";

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const issuer = await Issuer.discover(Env.ZITADEL_ISSUER ?? "");
		const client = new issuer.Client({
			client_id: Env.ZITADEL_CLIENT_ID || "",
			token_endpoint_auth_method: "none",
		});

		const { refresh_token, access_token, expires_at } = await client.refresh(
			token.refreshToken as string,
		);

		return {
			...token,
			accessToken: access_token,
			expiresAt: (expires_at ?? 0) * 1000,
			refreshToken: refresh_token, // Fall back to old refresh token
		};
	} catch (error) {
		console.error("Error during refreshAccessToken", error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: AuthOptions = {
	providers: [
		Zitadel({
			issuer: Env.ZITADEL_ISSUER,
			clientId: Env.ZITADEL_CLIENT_ID,
			clientSecret: Env.ZITADEL_CLIENT_SECRET,
			authorization: {
				params: {
					scope: "openid email profile offline_access",
				},
			},
			async profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					firstName: profile.given_name,
					lastName: profile.family_name,
					email: profile.email,
					loginName: profile.preferred_username,
					image: profile.picture,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			token.user ??= user;
			token.accessToken ??= account?.access_token;
			token.refreshToken ??= account?.refresh_token;
			token.expiresAt ??= (account?.expires_at ?? 0) * 1000;
			token.error = undefined;
			// Return previous token if the access token has not expired yet
			if (Date.now() < (token.expiresAt as number)) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, token: { user, error: tokenError } }) {
			const tokenUser = user as ZitadelProfile;
			session.user = {
				id: tokenUser?.id,
				email: tokenUser?.email,
				image: tokenUser?.image,
				name: tokenUser?.name,
				loginName: tokenUser?.loginName,
			} as unknown as DefaultSession["user"];
			(session as unknown as Record<string, string | undefined>).clientId =
				process.env.ZITADEL_CLIENT_ID;
			(session as unknown as Record<string, string | undefined>).error =
				tokenError as string | undefined;
			return session;
		},
		async signIn({ account, profile }) {
			if (account?.provider === "zitadel") {
				return (profile as ZitadelProfile).email_verified;
			}
			return true;
		},
	},
};
