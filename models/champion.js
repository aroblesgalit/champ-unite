const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const championSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    race: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    strength: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    power: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    combat: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    intelligence: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    speed: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    durability: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    attack: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    defense: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    nullStats: {
        type: Boolean,
        default: false
    }
});

const Champion = mongoose.model("Champion", championSchema);

module.exports = Champion;