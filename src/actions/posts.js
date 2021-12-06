import axios from "axios";

export const newPost = async (post) =>
  await axios.post(`http://localhost:8000/publicar`, post);

export const getPosts = async (userId) =>
  await axios.get(`http://localhost:8000/posts/favoritos/${userId}`);

export const getMyPL = async (userId) =>
  await axios.get(`http://localhost:8000/pl/${userId}`);

export const getTeams = async () =>
  await axios.get(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League`);

export const deletePost = async (id) =>
  await axios.delete(`http://localhost:8000/delete/${id}`);

export const like = async (plData) =>
  await axios.post(`http://localhost:8000/nuevolike`, plData);

export const dislike = async (data) =>
  await axios.post(`http://localhost:8000/dislike`, data);
