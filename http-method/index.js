const http = require("http");
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received \n` 
  const myUrl = url.parse(req.url, true);
  

  fs.appendFile("log.txt", log, (err, data) => {
    switch(myUrl.pathname){
        case '/':
            if(req.method === "GET") res.end("Home Page");
        break
        case "/about":
          const username = myUrl.query.myname;
          res.end(`Hi, ${username}`);
        break;

        case "/search":
          const search = myUrl.query.search_query;
          res.end("You searched for "+search);
        break;
        case "/signup":
            if(req.method === "GET") res.end("This is a Signup form");
            else if(req.method === "POST"){
                //DB QUERY
                res.end("SUCCESS")
            }
        break;
        default: res.end("404");
    }
  })
}); //Creates a http server for a user

server.listen(8000, () => console.log("Server started"));

