import axios from "axios";

export default {
    signupUser: function (data) {
        return axios.post("/api/users/signup", data);
    }
};