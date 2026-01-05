import { isAuthenticated } from "./auth.js";

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // =====================
  // LOGIN (POST from Webflow Form)
  // =====================
  if (path === "/app/login" && request.method === "POST") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=true; Path=/",
        "Location": "/dashboard"
      }
    });
  }

  // =====================
  // LOGOUT
  // =====================
  if (path === "/app/logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=; Path=/; Max-Age=0",
        "Location": "/login"
      }
    });
  }

  // =====================
  // AUTH CHECK API
  // =====================
  if (path === "/app/me") {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ loggedIn: false }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ loggedIn: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Not Found", { status: 404 });
}
