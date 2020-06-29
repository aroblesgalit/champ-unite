const axios = require("axios");
require("dotenv").config();

const accessToken = "2839209799538545";

module.exports = {
    searchHeroes: function(req, res) {
        const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

        let queryUrl = `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${accessToken}/search/${query}`;
        return new Promise((resolve, reject) => {
            axios
                .get(queryUrl)
                .then(res => {
                    const heroes = res;
                    resolve(heroes);
                })
                .catch(err => reject(err));
        })
    }
};