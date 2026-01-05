export default function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/cloud", "") || "/";
  const cookie = request.headers.get("cookie") || "";
  const isAuth = cookie.includes("auth=true");

  // HOME
  if (path === "/") {
    return new Response("Cloud App Running ✅");
  }

  // LOGIN PAGE
  if (path === "/login" && request.method === "GET") {
    return new Response(`
      <h2>Login</h2>
      <form method="POST" action="/cloud/login">
        <input name="user" placeholder="username" /><br><br>
        <input name="pass" type="password" /><br><br>
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
        "Location": "/cloud/dashboard"
      }
    });
  }

  // DASHBOARD
  if (path === "/dashboard") {
    if (!isAuth) {
      return new Response(null, {
        status: 302,
        headers: { "Location": "/cloud/login" }
      });
    }

    return new Response(`
      <h1>Welcome to Ecommerce Dashboard 🛒</h1>
      <a href="/cloud/logout">Logout</a>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }

  // LOGOUT
  if (path === "/logout") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": "auth=; Path=/; Max-Age=0",
        "Location": "/cloud/login"
      }
    });
  }

  return new Response("404 - Page not found", { status: 404 });
}
