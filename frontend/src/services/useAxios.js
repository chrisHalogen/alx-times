import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import isTokenExpired from "../utils/isTokenExpired";
import { BASE_URL } from "../constants/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use(async (req) => {
    console.log("Check 1");
    // If there's no refresh token or the token has expired
    if (!authTokens?.refresh || isTokenExpired(authTokens.refresh)) {
      logoutUser();
      throw new Error("Expired Token");
    }

    console.log("Check 2");

    // If the token has not expired, return
    if (!isTokenExpired(authTokens.access)) {
      req.headers.Authorization = `Bearer ${authTokens.access}`;
      return req;
    }

    console.log("Check 3");

    const response = await axios.post(`${BASE_URL}/auth/jwt/refresh/`, {
      refresh: authTokens.refresh,
    });

    console.log("Check 4");

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
