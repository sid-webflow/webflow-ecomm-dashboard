export default function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const cookie = request.headers.get("cookie") || "";
  const isAuth = cookie.includes("auth=true");

  // LOGIN PAGE
  if (path === "/login" && request.method === "GET") {
    return new Response(`
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input name="user" placeholder="username" /><br><br>
        <input name="pass" type="password" placeholder="password" /><br><br>
        <button>Login</button>
      </form>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }

  // LOGIN ACTION
  if (path === "/login" && request.method === "POST") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=true; Path=/",
        "Location": "/dashboard"
      }
    });
  }

  // LOGOUT
  if (path === "/logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=; Path=/; Max-Age=0",
        "Location": "/login"
      }
    });
  }

  // DASHBOARD (Protected)
  if (path === "/dashboard") {
    if (!isAuth) {
      return new Response(null, {
        status: 302,
        headers: { "Location": "/login" }
      });
    }

    return new Response(`
      <h1>Ecommerce Dashboard</h1>
      <p>Welcome! Login successful ✅</p>
      <a href="/logout">Logout</a>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }

  return new Response("Page not found", { status: 404 });
}
