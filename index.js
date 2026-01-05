export default function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/cloud", "") || "/";
  const cookie = request.headers.get("cookie") || "";
  const isAuth = cookie.includes("auth=true");

  if (path === "/login" && request.method === "GET") {
    return new Response("Login Page");
  }

  if (path === "/dashboard") {
    return new Response("Dashboard");
  }

  return new Response("Not Found", { status: 404 });
}
