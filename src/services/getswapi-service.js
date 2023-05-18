import axios from "axios";

export const getAllResources = () => axios.get("https://swapi.dev/api/");
