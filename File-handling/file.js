const fs = require("fs");

//Sync call
// fs.writeFileSync("./file.txt", "Hi from ");

//Async
//fs.writeFile("./file.txt", "Hi kaise ho", (err) => {})

//const result = fs.readFileSync("./contacts.txt", "utf-8")
// console.log(result);

// fs.readFile("./contacts.txt", "utf-8", (err, result)=> {
//     if(err){
//         console.log(error);
//     } else{
//         console.log(result);
        
//     }
// })

//apend a file

//fs.appendFileSync("./file.txt", `${Date.now()} Hi \n`)

//fs.cpSync("./file.txt", "./copy.txt")

//fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./file.js"));
//console.log(fs.mkdirSync("docs"));

