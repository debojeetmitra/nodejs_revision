const fs = require("fs");
const os = require("os");    

console.log(os.cpus().length);


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


//Blocking vs Non-Blocking

//Blocking...
// console.log("1");
// const result = fs.readFileSync("contacts.txt", "utf-8");
// console.log(result);
// console.log("2");

//Non-Blocking
//console.log("1");
const result = fs.readFile("contacts.txt", "utf-8", (err, res) => {
    //console.log(res);
    
});

//console.log("2");
//console.log("2");



 
