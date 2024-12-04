const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kintaiSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    
});

module.exports = mongoose.model("Kintai", kintaiSchema)