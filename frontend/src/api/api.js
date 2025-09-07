import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change to your deployed URL later
});

export default API;
