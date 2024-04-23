import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./navigation";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";

// const publicPages = ["/", "/login", "/sentiment"];
const privatePages = ["/admin"];

const handleI18nRouting = createIntlMiddleware({
  locales,
  localePrefix: "never",
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const privatePathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${privatePages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = !privatePathnameRegex.test(request.nextUrl.pathname);

  if (isPublicPage) {
    return handleI18nRouting(request);
  } else {
    const authenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec: any) => {
        try {
          const session = await fetchAuthSession(contextSpec);
          return session.tokens !== undefined;
        } catch (error) {
          return false;
        }
      },
    });

    if (!authenticated) {
      request.nextUrl.pathname = `/login`;
    }
    return handleI18nRouting(request);
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(th|en)/:path*",
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

// const [, locale, ...segments] = request.nextUrl.pathname.split("/");
// const url = new URL(`/login`, request.url);
// responseI18n.headers.set("x-middleware-rewrite", url.toString());
// return NextResponse.rewrite(new URL("/login", request.url));
