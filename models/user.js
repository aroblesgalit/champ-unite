const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

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
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
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

userSchema.pre("save", async function save(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // Hash the password along with the new salt
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.validPassword = async function validPassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;