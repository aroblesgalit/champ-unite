const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();


// ------------------- Authenticated ------------------- //
// ------------------- Authenticated ------------------- //

router.post("/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    res.redirect("/profile");
});

router.post("/signup", function (req, res) {
    console.log("Post signup ran...");
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
        .then(function (dbUser) {
            res.redirect(307, "/api/users/login");
            console.log(dbUser);
        })
        .catch(function (err) {
            console.log(err);
            res.status(401).json(err);
        });
});

router.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        res.json({})
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

// Add a champion to the champions array
router.put("/:id/:champion", function (req, res) {
    db.User
        .findByIdAndUpdate(req.params.id, {
            $push: { champions: req.params.champion }
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Remove a champion from the champions array
router.put("/champions/:user/:champion", function (req, res) {
    db.User
        .updateOne({ _id: req.params.user }, {
            $pull: { champions: req.params.champion }
        }, { safe: true, multi: true })
        .then(res => res.json(res))
        .catch(err => res.status(422).json(err));
});





// ------------------- Unauthenticated ------------------- //
// ------------------- Unauthenticated ------------------- //

// Get all users
router.get("/", function (req, res) {
    db.User
        .find({})
        .sort({ username: 1 })
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

// Get user by username
router.get("/:username", function (req, res) {
    db.User
        .find({ username: req.params.username })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Get all users but one
router.get("/search/:id", function (req, res) {
    db.User
        .find({
            _id: {
                $ne: req.params.id
            }
        })
        .sort({ username: 1 })
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

// Get a user by id
router.get("/id/:id", function (req, res) {
    db.User
        .findOne({ _id: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;