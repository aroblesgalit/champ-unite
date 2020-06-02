const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    // res.redirect("/users/" + req.user.username);
});

router.post("/signup", function (req, res) {
    console.log("Post signup ran...");
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
        .then(function (dbUser) {
            // res.redirect(307, "/api/users/login");
            console.log(dbUser);
        })
        .catch(function (err) {
            console.log(err);
            res.status(401).json(err);
        });
});

router.get("/user_data", function (req, res) {
    if (!req.user) {
        res.status(401).json({});
    } else {
        res.json({
            id: req.user._id,
            username: req.user.username,
            champions: req.user.champions,
            wins: req.user.wins,
            losses: req.user.losses,
            rank: req.user.rank
            // total battles > wins + losses
            // percent for ranking > wins/(wins+losses)
        })
    }
});

module.exports = router;