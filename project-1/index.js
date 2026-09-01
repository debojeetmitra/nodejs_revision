const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
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
    res.setHeader("X-myName", "Debojeet Mitra") // Custom Header
    // Always add X to custom headers
    return res.json(users)
})

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "user not found bro !!"})
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

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields req bro !!!"})
    }

    users.push({ ...body, id: users.length + 1 });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {

        if (err) {
            return res.status(500).json({ status: "error" });
        }

        return res.status(201)
            .json({
                status: "success",
                values: users
            });
    });
});




app.listen(PORT, () => console.log(`Server started at ${PORT}`))