require("dotenv").config();
const express = require("express");
const Userrouter = require("./api/user/router");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use("/api/user", Userrouter)

app.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_PORT);
});