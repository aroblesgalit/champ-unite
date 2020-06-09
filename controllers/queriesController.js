const db = require("../models");

// Define methods for queries
module.exports = {
    findAQuery: function (req, res) {
        db.Query
            .findOne({ query: req.params.query })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    addAQuery: function (req, res) {
        db.Query
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};