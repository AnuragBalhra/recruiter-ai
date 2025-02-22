import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


const isProtectedRoute = createRouteMatcher([
    '/interview(.*)'
])

const isApiRoute = createRouteMatcher([
    '/api(.*)',
])

const isAuthRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
])

const isOnboardingRoute = createRouteMatcher(["/onboarding"])

const isPublicRoute = createRouteMatcher([
    '/',
    '/candidate',
    '/about',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api(.*)',
])


export default clerkMiddleware(async (auth, req: NextRequest) => {
  const url = req.nextUrl;
  let hostname = req.headers?.get("host")!.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log("hostname in middleware: ", hostname);

  if (
    hostname?.includes("---") &&
    hostname?.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }  

  const searchParams = req.nextUrl?.searchParams?.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  console.log("path in middleware: ", path);

  if (isAuthRoute(req)) {
    return NextResponse.next();
  }
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  if (isApiRoute(req)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims, redirectToSignIn } = auth();
    const countryCode = req?.geo?.country ?? "";
    // console.log("country code: ", countryCode);
    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(req))
      return redirectToSignIn({ returnBackUrl: req.url });

    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    // if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    //   const onboardingUrl = new URL("/onboarding", req.url);
    //   return NextResponse.redirect(onboardingUrl);
    // }

    // For users visiting /onboarding, don't try to redirect
    if (userId && isOnboardingRoute(req)) {
      return NextResponse.next();
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && !isPublicRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', "/practice(.*)"],
};