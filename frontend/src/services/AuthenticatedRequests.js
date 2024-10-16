import { useCallback } from "react";
import useAxios from "./useAxios_";
import { BASE_URL } from "../constants/api";

const useApi = () => {
  const api = useAxios();

  const registerLog = useCallback(
    (activityMessage) => {
      return api.post(`${BASE_URL}/data/activity-logs/`, {
        activity: activityMessage,
      });
    },
    [api]
  );

  const getLogs = useCallback(() => {
    return api.get(`${BASE_URL}/data/activity-logs/`);
  }, [api]);

  const changeEmailAddress = useCallback(
    (data) => {
      return api.post(`${BASE_URL}/auth/users/set_email/`, data);
    },
    [api]
  );

  const changePassword = useCallback(
    (data) => {
      return api.post(`${BASE_URL}/auth/users/set_password/`, data);
    },
    [api]
  );

  const createNewArticle = useCallback(
    (formData) => {
      return api.post("/data/articles/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
    },
    [api]
  );

  const getArticles = useCallback(
    (page) => {
      return api.get(`${BASE_URL}/data/articles/?page=${page}`);
    },
    [api]
  );

  const getArticle = useCallback(
    (id) => {
      return api.get(`${BASE_URL}/data/articles/${id}/view/`);
    },
    [api]
  );

  // const editArticle = useCallback(
  //   (id) => {
  //     return api.patch(`${BASE_URL}/data/articles/${id}/`);
  //   },
  //   [api]
  // );

  const editArticle = useCallback(
    (formData, id) => {
      return api.patch(`${BASE_URL}/data/articles/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    [api]
  );

  const deleteArticle = useCallback(
    (id) => {
      return api.patch(`${BASE_URL}/data/articles/${id}/delete/`);
    },
    [api]
  );

  // const resetEmailAddress = useCallback(
  //   (data) => {
  //     return api.post(`${BASE_URL}/auth/users/reset_email/`, data);
  //   },
  //   [api]
  // );

  const editUserProfile = useCallback(
    (data) => {
      return api.patch(`${BASE_URL}/auth/users/me/`, data);
    },
    [api]
  );

  return {
    registerLog,
    getLogs,
    changeEmailAddress,
    changePassword,
    editUserProfile,
    createNewArticle,
    getArticles,
    getArticle,
    deleteArticle,
    editArticle,
  };
};

export default useApi;
