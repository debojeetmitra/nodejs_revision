const app = express();
const PORT = 8000;

const { connectMongoDb } = require("./connection")
const { logReqRes} = require("./middlewares")

const userRouter = require('./routes/user')

//connection
connectMongoDb('mongodb://127.0.0.1:27017/my-app')


app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use((req, res, next) => {
    console.log('Hello from middleware 2', req.myUserName);
    next();
})

// Routes

app.use("/user", userRouter);


app.listen(PORT, () => console.log(`Server started at ${PORT}`))