import { isAuthenticated } from "./auth.js";

export function dashboard(req, res) {
  if (!isAuthenticated(req)) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Welcome to Ecommerce Dashboard 🛒</h1>
    <a href="/logout">Logout</a>
  `);
}
