const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    res.redirect("/users/" + req.user.username);
});

router.post("/signup", function (req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(function (dbUser) {
            res.redirect(307, "/api/users/login");
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
});

router.get("/user_data", function (req, res) {
    if (!req.user) {
        res.status(401).json({});
    } else {
        res.json({
            id: req.user._id,
            username: req.user.username
        })
    }
});

module.exports = router;