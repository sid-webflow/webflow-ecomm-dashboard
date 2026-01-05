export function isAuthenticated(req) {
  const cookie = req.headers.cookie || "";
  return cookie.includes("auth=true");
}
