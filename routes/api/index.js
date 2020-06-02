const router = require("express").Router();
const championRoutes = require("./champions");
const userRoutes = require("./users");
const heroRoutes = require("./heroesAPI");

router.use("/champions", championRoutes);
router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);

module.exports = router;