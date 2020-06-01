const db = require("../models");

// Define methods for the champions
module.exports = {
    getById: function(req, res) {
        db.Champion
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getByUserId: function(req, res) {
        db.Champion
            .find({
                user: req._id
            })
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Champion
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};