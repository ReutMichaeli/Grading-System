import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // לוודא שהשרת אכן פועל כאן
});
