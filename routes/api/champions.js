const router = require("express").Router();
const championsController = require("../../controllers/championsController");

// Matches with "/api/champions"
router.route("/")
    .get(championsController.getAll)
    .post(championsController.create);

// Matches with "/api/champions/:id"
router.route("/:id")
    .get(championsController.getById)

router.route("/query/:query")
    .get(championsController.getByQuery)

router.route("/user/:id")
    .get(championsController.getByUserId)

module.exports = router;