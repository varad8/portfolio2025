import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt"; // Your JWT verify helper

export async function middleware(req) {
  const session = req.cookies.get("session")?.value;

  // If no session or invalid session, clear cookie and redirect to login
  if (!session || !(await verifyJwt(session))) {
    const res = NextResponse.redirect(new URL("/user/login", req.url));
    res.cookies.set("session", "", { path: "/", expires: new Date(0) });
    return res;
  }

  // If session is valid, continue
  return NextResponse.next();
}

// Optionally, only run middleware on protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Add your protected routes here
};
