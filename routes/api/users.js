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
        displayName: req.body.displayName,
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
            displayName: req.user.displayName,
            username: req.user.username,
            champions: req.user.champions,
            wins: req.user.wins,
            losses: req.user.losses,
            rank: req.user.rank,
            totalBattle: req.user.totalBattle,
            winsPercent: req.user.winsPercent,
            image: req.user.image
        })
    }
});

// Add a champion to the champions array
router.put("/:id/:champion", function (req, res) {
    db.User
        .findByIdAndUpdate(req.params.id, {
            $push: { champions: req.params.champion }
        }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Remove a champion from the champions array
router.put("/champions/:user/:champion", function (req, res) {
    db.User
        .updateOne({ _id: req.params.user }, {
            $pull: { champions: req.params.champion }
        }, { new: true })
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
        .populate("champions")
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

// Get all users with champions populated
router.get("/with_champs_populated", function (req, res) {
    db.User
        .find({})
        .populate("champions")
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});


// Get a user by username
router.get("/username/:username", function (req, res) {
    db.User
        .find({ username: req.params.username })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Get all users for ranking
router.get("/ranking", function (req, res) {
    db.User
        .find({
            totalBattle: { $gte: 20 }
        })
        .sort({ winsPercent: -1 })
        .then(dbModels => res.json(dbModels))
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

// Search all users by query
router.get("/search_by_username/:username", function (req, res) {
    db.User
        .find({
            username: {
                $regex: req.params.username,
                $options: "i"
            }
        })
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

// Increment user's wins
router.put("/update/wins/:id", function (req, res) {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, {
            $inc: { wins: 1 }
        }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Increment user's losses
router.put("/update/losses/:id", function (req, res) {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, {
            $inc: { losses: 1 }
        }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Calculate total number of battles
router.put("/update/total_battle/:id", function (req, res) {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, {
            $inc: { totalBattle: 1 }
        }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Update wins percent or anything
router.put("/update/wins_percent/:id", function (req, res) {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;