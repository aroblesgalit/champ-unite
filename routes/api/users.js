const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/users/" + req.user.username)
});