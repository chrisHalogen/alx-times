import axios from "axios";
import { BASE_URL } from "../constants/api";

const createNewUser = (data) => axios.post(`${BASE_URL}/auth/users/`, data);

const loginNewUser = (data) => axios.post(`${BASE_URL}/auth/jwt/create/`, data);

const searchArticle = (searchTerm, page) =>
  axios.get(
    `${BASE_URL}/data/articles/search/?term=${searchTerm}&page=${page}`
  );

const filterArticle = (
  searchTerm = "",
  category = "",
  featured = null,
  latest = false,
  page = 1
) => {
  // Construct query parameters dynamically
  const params = new URLSearchParams({
    term: searchTerm, // Allowing full sentences or phrases
    page,
  });

  if (category) params.append("category", category);
  if (featured !== null) params.append("featured", featured);
  if (latest) params.append("latest", "true");

  // Make the GET request with all query parameters
  return axios.get(`${BASE_URL}/data/articles/filter/?${params.toString()}`);
};

const fetchHomeArticles = () => axios.get(`${BASE_URL}/data/articles/export/`);

const fetchArticleDetails = (id) =>
  axios.get(`${BASE_URL}/data/articles/${id}/detail/`);

export default {
  createNewUser,
  loginNewUser,
  searchArticle,
  filterArticle,
  fetchHomeArticles,
  fetchArticleDetails,
};
