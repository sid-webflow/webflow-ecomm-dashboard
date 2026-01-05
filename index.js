import http from "http";
import { dashboard } from "./dashboard.js";
import { parse } from "url";

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);

  // IMPORTANT FIX 👇
const path = url.pathname.replace("/cloud", "") || "/";

  // LOGIN PAGE
  if (path === "/login" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>Login</h2>
      <form method="POST" action="/cloud/login">
        <input placeholder="username" /><br><br>
        <input type="password" placeholder="password" /><br><br>
        <button>Login</button>
      </form>
    `);
    return;
  }

  // LOGIN ACTION
  if (path === "/login" && req.method === "POST") {
    res.writeHead(302, {
      "Set-Cookie": "auth=true; Path=/",
      Location: "/cloud/dashboard"
    });
    res.end();
    return;
  }

  // LOGOUT
  if (path === "/logout") {
    res.writeHead(302, {
      "Set-Cookie": "auth=false; Path=/; Max-Age=0",
      Location: "/cloud/login"
    });
    res.end();
    return;
  }

  // DASHBOARD
  if (path === "/dashboard") {
    dashboard(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

export default server;
