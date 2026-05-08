import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/tasks", "/calendar", "/gym", "/profile"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options as never));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const needsAuth = protectedRoutes.some((route) => path.startsWith(route));

  if (needsAuth && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/calendar/:path*", "/gym/:path*", "/profile/:path*", "/login"]
};
