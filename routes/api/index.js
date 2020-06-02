const router = require("express").Router();
const championRoutes = require("./champions");
const userRoutes = require("./users");

router.use("/champions", championRoutes);
router.use("/users", userRoutes);

module.exports = router;