import axios from "axios";

export const newPost = async (post) =>
  await axios.post(`http://localhost:8000/publicar`, post);

export const getPosts = async () =>
  await axios.get(`http://localhost:8000/posts`);

export const getMyPL = async (userId) =>
  await axios.get(`http://localhost:8000/pl/${userId}`);

export const deletePost = async (id) =>
  await axios.delete(`http://localhost:8000/delete/${id}`);

export const like = async (plData) =>
  await axios.post(`http://localhost:8000/nuevolike`, plData);

export const dislike = async (data) =>
  await axios.post(`http://localhost:8000/dislike`, data);
