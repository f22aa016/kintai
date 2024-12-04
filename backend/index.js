const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5050;
require("dotenv").config();
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));
// console.log(process.env.SECRET_KEY);
// http://localhost:5050/api/v1/register

// DB接続
try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DB接続中");
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log("サーバー起動中");
});