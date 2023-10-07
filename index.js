const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/userRoutes")
const cors = require("cors");
const { Authmiddleware } = require("./Middleware/Authmiddleware")
const { taskroute } = require("./Routes/taskRoutes")

const app = express()

//-------Middleware--------//
app.use(express.json())
app.use(cors());

//-------Routers----------//
app.use("/users", userRouter)
app.use("/tasks",taskroute)

app.listen(3000, async () => {
    try {
        await connection
        console.log("Connected to the database successfully!")
    } catch (error) {
        console.log("Error while connecting to the database!")
    }
    console.log("server is running at port 3000!")
})