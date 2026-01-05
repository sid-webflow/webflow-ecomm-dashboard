export default function handler(request) {
  const url = new URL(request.url);

  // Remove /app from path
  const path = url.pathname.replace("/app", "") || "/";
  const cookie = request.headers.get("cookie") || "";
  const isAuth = cookie.includes("auth=true");

  // ROOT
  if (path === "/") {
    return new Response("Webflow Cloud App Running ✅");
  }

  // LOGIN PAGE
  if (path === "/login" && request.method === "GET") {
    return new Response(`
      <h2>Login</h2>
      <form method="POST" action="/app/login">
        <input placeholder="username" /><br><br>
        <input type="password" /><br><br>
        <button>Login</button>
      </form>
    `, { headers: { "Content-Type": "text/html" } });
  }

  // LOGIN ACTION
  if (path === "/login" && request.method === "POST") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=true; Path=/",
        "Location": "/app/dashboard"
      }
    });
  }

  // DASHBOARD (Protected)
  if (path === "/dashboard") {
    if (!isAuth) {
      return new Response(null, {
        status: 302,
        headers: { "Location": "/app/login" }
      });
    }

    return new Response(`
      <h1>Cloud Dashboard 🛒</h1>
      <p>Login successful</p>
      <a href="/app/logout">Logout</a>
    `, { headers: { "Content-Type": "text/html" } });
  }

  // LOGOUT
  if (path === "/logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=; Path=/; Max-Age=0",
        "Location": "/app/login"
      }
    });
  }

  return new Response("404 - Cloud route not found", { status: 404 });
}
