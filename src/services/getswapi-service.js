import axios from "axios";

/* Será usada en el await de la funcion que trae los recursos*/
export const getAllResources = () => axios.get("https://swapi.dev/api/");
