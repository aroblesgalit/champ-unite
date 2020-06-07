import axios from "axios";
require("dotenv").config();

export default {
    signupUser: function (data) {
        return axios.post("/api/users/signup", data);
    },
    loginUser: function (data) {
        return axios.post("/api/users/login", data);
    },
    logoutUser: function () {
        return axios.get("/api/users/logout");
    },
    getUserData: function () {
        return axios.get("/api/users/user_data");
    },
    // Add to user's champions
    updateUserChampions: function (id, champion) {
        return axios.put("/api/users/" + id + "/" + champion);
    },
    // Update user's champions by removing an id from the array
    removeChampionFromUser: function(user, champion) {
        return axios.put("/api/users/champions/" + user + "/" + champion)
    },
    // searchHeroes: function (query) {
    //     return axios.get("/api/heroes/" + query);
    // }
    addChampion: function (data) {
        return axios.post("/api/champions", data);
    },
    getAllChampions: function () {
        return axios.get("/api/champions")
    },
    getChampionsByQuery: function (query) {
        return axios.get("/api/champions/query/" + query)
    },
    getChampionById: function(id) {
        return axios.get("/api/champions/" + id)
    },
    getChampionsByUserId: function(id) {
        return axios.get("/api/champions/user/" + id)
    },
    removeChampion: function(id) {
        return axios.delete("/api/champions/" + id);
    },
    // searchHeroes: function (query) {
    //     return axios.get("/api/heroes/" + query);
    // }
    searchHeroes: function (query) {
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
    },
    // Get all users
    getAllUsers: function() {
        return axios.get("/api/users");
    },
    // Get a user by the username
    getUserByUsername: function(username) {
        return axios.get("/api/users/" + username);
    },
    // Get all users but one
    getAllUsersButOne: function(id) {
        return axios.get("/api/users/search/" + id);
    },
    // Get a user by _id
    getUserById: function(id) {
        return axios.get("/api/users/id/" + id);
    },
    // Update user's wins
    increaseUserWins: function(id) {
        return axios.put("/api/users/wins/" + id);
    },
    // Update user's losses
    increaseUserLosses: function(id) {
        return axios.put("/api/users/losses/" + id);
    },
    // Update user's totalBattle
    increaseTotalBattle: function(id) {
        return axios.put("/api/users/total_battle/" + id);
    }
};