import { jwtDecode } from "jwt-decode";

function convertTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleString();
}

export default function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  if (!decodedToken) {
    return true; // Token is not valid or expired
  }
  const expirationTime = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  // console.log("Expiration time = ", convertTime(expirationTime));
  // console.log("Current time = ", convertTime(currentTime));
  return currentTime >= expirationTime;
}
