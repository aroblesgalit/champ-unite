const axios = require("axios");

const accessToken = "2839209799538545";

module.exports = {
    searchHeroes: function(req, res) {
        return axios.get("https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/" + accessToken + "/search/" + req.params.query)
            .then(data => {
                console.log(data);
                res.json(data);
            })
            .catch(err => res.status(422).json(err));
    }
};