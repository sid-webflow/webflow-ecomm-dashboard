export function isAuthenticated(request) {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes("auth=true");
}
