import axios from "axios";

export const api = axios.create({
  baseURL: "https://grading-system-33.onrender.com/", // לוודא שהשרת אכן פועל כאן
});

