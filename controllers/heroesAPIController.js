const axios = require("axios");

const accessToken = "2839209799538545";

module.exports = {
    searchHeroes: function(req, res) {
        axios.get("https://superheroapi.com/api/" + accessToken + "/search/" + req.params.query)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
};