import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import isTokenExpired from "../utils/isTokenExpired";
import { BASE_URL } from "../constants/api";

const baseURL = BASE_URL;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useAuthContext();

  // console.log(`Bearer ${authTokens?.access}`);

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${
        authTokens?.access ||
        JSON.parse(localStorage.getItem("authTokens"))?.access
      }`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    // console.log("Check 1");
    // If there's no refresh token or the token has expired
    if (!authTokens.refresh || isTokenExpired(authTokens.refresh)) {
      logoutUser();
      throw new Error("Expired Token");
    }

    // console.log("Check 2");

    // If the token has not expired, return
    if (!isTokenExpired(authTokens.access)) return req;

    // console.log("Check 3");

    const response = await axios.post(
      `${baseURL}/auth/jwt/refresh/`,
      {
        refresh: authTokens.refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

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
