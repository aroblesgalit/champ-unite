const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    heroes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Champion"
        }]
    },
    rank: {
        type: Number
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;