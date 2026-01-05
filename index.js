import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Ecommerce Dashboard – Webflow Cloud Working 🚀</h1>");
});

server.listen(3000, () => {
  console.log("Server running");
});
