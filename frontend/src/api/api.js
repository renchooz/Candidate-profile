import axios from "axios";

const API = axios.create({
  baseURL: "https://candidate-profile-vi7q.onrender.com/",
});

export default API;
