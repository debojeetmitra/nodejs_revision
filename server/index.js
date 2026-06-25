const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received \n`  
  fs.appendFile("log.txt", log, (err, data) => {
    switch(req.url){
        case '/': res.end("Home Page");
        break
        case "/about": res.end("I am Debojeet Mitra");
        break;
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