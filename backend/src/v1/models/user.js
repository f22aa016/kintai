const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        reqired: true,
        unique: true,
    },
    password: {
        type : String,
        reqired: true,
    },
});

module.exports = mongoose.model("User", userSchema)