const router = require("express").Router();
const championRoutes = require("./champions");

router.use("/champions", championRoutes);

module.exports = router;