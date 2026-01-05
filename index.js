import http from "http";
import { dashboard } from "./dashboard.js";

const server = http.createServer((req, res) => {

  // LOGIN PAGE
  if (req.url === "/login") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input placeholder="username" /><br><br>
        <input type="password" placeholder="password" /><br><br>
        <button>Login</button>
      </form>
    `);
    return;
  }

  // LOGIN ACTION
  if (req.url === "/login" && req.method === "POST") {
    res.writeHead(302, {
      "Set-Cookie": "auth=true; Path=/",
      Location: "/dashboard"
    });
    res.end();
    return;
  }

  // LOGOUT
  if (req.url === "/logout") {
    res.writeHead(302, {
      "Set-Cookie": "auth=false; Path=/; Max-Age=0",
      Location: "/login"
    });
    res.end();
    return;
  }

  // DASHBOARD (Protected)
  if (req.url === "/dashboard") {
    dashboard(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000);
