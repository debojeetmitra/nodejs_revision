const http = require("http");
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Req Received \n` 
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {
    switch(myUrl.pathname){
        case '/': res.end("Home Page");
        break
        case "/about":
          const username = myUrl.query.myname;
          res.end(`Hi, ${username}`);
        break;

        case "/search":
          const search = myUrl.query.search_query;
          res.end("You searched for "+search);
        default: res.end("404")
    }
  })
}); //Creates a http server for a user

server.listen(8000, () => console.log("Server started"));









/*
Creates a basic HTTP server using Node.js.
- Listens for incoming requests on port 8000.
- Logs each request URL with a timestamp to log.txt.
- Routes requests based on the URL:
    '/'      -> Home Page
    '/about' -> About page
    others   -> 404 response
- Uses asynchronous file handling with fs.appendFile().
*/