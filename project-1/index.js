const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false}));

app.use((req, res, next)=> {
    console.log('Hello from middleware 1');
    req.myUserName = 'debo.dev';
    next();
    
})

app.use((req, res, next) => {
    console.log('Hello from middleware 2', req.myUserName);
    next();
})

//Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
      `;
    res.send(html)
})

//REST API
app.get('/api/users', (req, res) => {
    console.log('I am in get route', req.myUserName);
    return res.json(users)
})

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        //Edit user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        //Delete user with id
        return res.json({ status: Pending })
    })


    app.post('/api/users', (req, res) => {

        // Todo status pending
        const body = req.body;
    
        users.push({ ...body, id: users.length + 1 });
    
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    
            if (err) {
                return res.status(500).json({ status: "error" });
            }
    
            return res.json({
                status: "success",
                values: users
            });
        });
    });




app.listen(PORT, () => console.log(`Server started at ${PORT}`))