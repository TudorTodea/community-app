const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();
const user = require("./Routes/User")
// const auth = require('./Middleware/Auth');
// app.use(auth)
app.use(cors())
app.use(express.json());
app.use("/api/auth", user)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successfull")
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT} `)
})