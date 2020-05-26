const router = require("express").Router();
const championsController = require("../../controllers/championsController");

// Matches with "/api/champions"
router.route("/")
    .get(championsController.getByUserId)
    .post(championsController.create);

// Matches with "/api/champions/:id"
router.route("/:id")
    .get(championsController.getById)

module.exports = router;