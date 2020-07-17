import axios from "axios";
require("dotenv").config();
import HeroImg1 from "../images/hero-img-1.svg";
import HeroImg2 from "../images/hero-img-2.svg";
import HeroImg3 from "../images/hero-img-3.svg";
import HeroImg4 from "../images/hero-img-4.svg";
import HeroImg5 from "../images/hero-img-5.svg";
import HeroImg6 from "../images/hero-img-6.svg";
import HeroImg7 from "../images/hero-img-7.svg";
import HeroImg8 from "../images/hero-img-8.svg";
import HeroImg9 from "../images/hero-img-9.svg";
import HeroImg10 from "../images/hero-img-10.svg";

// <a href='https://www.freepik.com/free-photos-vectors/kids'>Kids vector created by macrovector - www.freepik.com</a>
const defaultChampImages = [HeroImg1, HeroImg2, HeroImg3, HeroImg4, HeroImg5, HeroImg6, HeroImg7, HeroImg8, HeroImg9, HeroImg10];

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
    removeChampionFromUser: function (user, champion) {
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
    // getChampionsByQuery: function (query) {
    //     return axios.get("/api/champions/query/" + query)
    // },
    findChampionsByQuery: function (query) {
        return axios.get("/api/champions/query/" + query)
    },
    findAChampionBySuperHeroId: function (id) {
        return axios.get("/api/champions/superhero_id/" + id);
    },
    getChampionById: function (id) {
        return axios.get("/api/champions/" + id)
    },
    getChampionsByUserId: function (id) {
        return axios.get("/api/champions/user/" + id)
    },
    removeChampion: function (id) {
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
    // Get a default image from defaultChampImages array
    getDefaultImage: function () {
        return new Promise((resolve, reject) => {
            const randomNum = Math.floor(Math.random() * defaultChampImages.length);
            const randomImg = defaultChampImages[randomNum];
            resolve(randomImg);
        })
    },
    // Get all users
    getAllUsers: function () {
        return axios.get("/api/users");
    },
    // Get all usesrs with champions popuplated with their objects
    getAllUsersAndChamps: function () {
        return axios.get("/api/users/with_champs_populated");
    },
    // Get all users for ranking
    getAllUsersForRanking: function () {
        return axios.get("/api/users/ranking");
    },
    // Get a user by the username
    getUserByUsername: function (username) {
        return axios.get("/api/users/username/" + username);
    },
    // Get all users but one
    getAllUsersButOne: function (id) {
        return axios.get("/api/users/search/" + id);
    },
    // Get a user by _id
    getUserById: function (id) {
        return axios.get("/api/users/id/" + id);
    },
    // Update user's wins
    increaseUserWins: function (id) {
        return axios.put("/api/users/update/wins/" + id);
    },
    // Update user's losses
    increaseUserLosses: function (id) {
        return axios.put("/api/users/update/losses/" + id);
    },
    // Update user's totalBattle
    increaseTotalBattle: function (id) {
        return axios.put("/api/users/update/total_battle/" + id);
    },
    // Update user's winsPercent
    updateWinsPercent: function (id, data) {
        return axios.put("/api/users/update/wins_percent/" + id, data);
    },
    // Get users by a search username query
    getUsersBySearch: function (username) {
        return axios.get("/api/users/search_by_username/" + username);
    },
    findAQuery: function (query) {
        return axios.get("/api/queries/" + query);
    },
    addAQuery: function (data) {
        return axios.post("/api/queries", data);
    }
};