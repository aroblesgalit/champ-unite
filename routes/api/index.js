const router = require("express").Router();
const championRoutes = require("./champions");
const userRoutes = require("./users");
const heroRoutes = require("./heroesAPI");
const queryRoutes = require("./queries");

router.use("/champions", championRoutes);
router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);
router.use("/queries", queryRoutes);

module.exports = router;