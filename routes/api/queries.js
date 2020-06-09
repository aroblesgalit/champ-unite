const router = require("express").Router();
const queriesController = require("../../controllers/queriesController");

// Matches with "/"
router.route("/")
    .post(queriesController.addAQuery);

// Matches with "api/queries/:query"
router.route("/:query")
    .get(queriesController.findAQuery);

module.exports = router;