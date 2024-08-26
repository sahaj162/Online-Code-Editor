import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

// API Client
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston", // URL From Pistron-API Doc
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    // Passing Object
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  // Returning The API Response
  console.log("API Call  Successful")
  return response.data; // data prop
};
