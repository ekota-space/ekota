import { apiService } from "@/services/api/api";
import {
	type NextRequest,
	NextResponse,
	type MiddlewareConfig,
} from "next/server";

const openRoutes = ["/auth/login", "/auth/register"];

export default async function middleware(
	req: NextRequest,
): Promise<NextResponse> {
	const { pathname } = req.nextUrl;
	const { data: user } = await apiService.user.me();

	if (!user && !openRoutes.includes(pathname)) {
		req.nextUrl.pathname = "/auth/login";
		return NextResponse.redirect(req.nextUrl);
	}

	if (user && openRoutes.includes(pathname)) {
		req.nextUrl.pathname = "/";
		return NextResponse.redirect(req.nextUrl);
	}

	return NextResponse.next();
}

export const config: MiddlewareConfig = {
	matcher: ["/", "/auth/:path*", "/organizations/:path*"],
};