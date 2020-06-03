import axios from "axios";

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
        const accessToken = "2839209799538545";

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