import axios from "axios";

export default {
    signup: function (data) {
        return axios.post("/api/users/signup", data);
    }
};