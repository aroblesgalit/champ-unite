const router = require("express").Router();
const heroesAPIController = require("../../controllers/heroesAPIController");

router.route("/:query")
    .get(heroesAPIController.searchHeroes)