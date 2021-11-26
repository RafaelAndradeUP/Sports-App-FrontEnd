import axios from "axios";

export const register = async (user) =>
  await axios.post(`http://localhost:8000/registro`, user);

export const getUser = async (userId) =>
  await axios.get(`http://localhost:8000/usuario/${userId}`);

export const updateUser = async (userId, data) =>
  await axios.put(`http://localhost:8000/usuario/update/${userId}`, data);

export const login = async (user) =>
  await axios.post(`http://localhost:8000/login`, user);

export const hasImage = async (userId) =>
  await axios.get(`http://localhost:8000/usuario/hasimage/${userId}`);