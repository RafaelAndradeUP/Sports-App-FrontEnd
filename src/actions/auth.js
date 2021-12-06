import axios from "axios";

export const register = async (user) =>
  await axios.post(`http://localhost:8000/registro`, user);

export const followUser = async (suData) =>
  await axios.post(`http://localhost:8000/nuevoseguidor`, suData);

export const followTeam = async (suData) =>
  await axios.post(`http://localhost:8000/nuevoseguidorequipo`, suData);

export const unfollowUser = async (data) =>
  await axios.post(`http://localhost:8000/dejardeseguir`, data);

export const unfollowTeam = async (data, docId) =>
  await axios.post(`http://localhost:8000/dejardeseguirequipo/${docId}`, data);

export const getMySU = async (userId) =>
  await axios.get(`http://localhost:8000/su/${userId}`);

export const getMyST = async (userId) =>
  await axios.get(`http://localhost:8000/st/${userId}`);

export const getUser = async (userId) =>
  await axios.get(`http://localhost:8000/usuario/${userId}`);

export const getUsers = async (searchCriteria) =>
  await axios.get(`http://localhost:8000/buscar/${searchCriteria}`);

export const updateUser = async (userId, data) =>
  await axios.put(`http://localhost:8000/usuario/update/${userId}`, data);

export const login = async (user) =>
  await axios.post(`http://localhost:8000/login`, user);

export const hasImage = async (userId) =>
  await axios.get(`http://localhost:8000/usuario/hasimage/${userId}`);