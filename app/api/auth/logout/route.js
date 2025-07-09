import { serialize } from "cookie";

export async function POST() {
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": serialize("session", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }),
      "Content-Type": "application/json",
    },
  });
}
