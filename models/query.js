const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
    query: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    results: {
        type: Boolean
    }
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;