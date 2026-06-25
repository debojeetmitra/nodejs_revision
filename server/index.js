const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from server again");
}); //Creates a http server for a user

server.listen(8000, () => console.log("Server started"));
