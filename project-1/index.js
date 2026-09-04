const express = require('express')
const fs = require('fs')
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//connection
mongoose
    .connect('mongodb://127.0.0.1:27017/my-app')
    .then(()=> console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo err", err));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,

    }

}, {timestamps: true})

const User = mongoose.model("user", userSchema)


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
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});

    const html = `
    <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
      `;
    res.send(html)
})

//REST API
app.get('/api/users',async  (req, res) => {
    const allDbUsers = await User.find();
    return res.json(allDbUsers)
})

app
    .route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found bro !!"})
        return res.json(user);
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, { lastName: "Changed"});
        return res.json({ status: "Success" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: Success })
    })


app.post('/api/users',async (req, res) => {

    // Todo status pending
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg: "All fields req bro !!!"})
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })   

    return res.status(201).json({ msg: "Success"})
});




app.listen(PORT, () => console.log(`Server started at ${PORT}`))