import axios from "axios";

export const register = async (user) =>
  await axios.post(`http://localhost:8000/registro`, user);

export const login = async (user) =>
  await axios.post(`http://localhost:8000/login`, user);