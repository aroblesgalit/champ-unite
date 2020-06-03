const db = require("../models");

// Define methods for the champions
module.exports = {
    getAll: function (req, res) {
        db.Champion
            .find({user: null})
            .sort({name: 1})
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    getByQuery: function (req, res) {
        db.Champion
            .find({
                query: req.params.query
            })
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    getById: function (req, res) {
        db.Champion
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getByUserId: function (req, res) {
        db.Champion
            .find({
                user: req.params.id
            })
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Champion
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Champion
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};