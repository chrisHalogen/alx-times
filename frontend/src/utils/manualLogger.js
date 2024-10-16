import axios from "axios";
import { BASE_URL } from "../constants/api";

// const BASE_URL = "YOUR_BASE_URL_HERE"; // Replace with your actual base URL

/**
 * Utility function to register a user activity log.
 *
 * @param {string} accessToken - The Bearer token for authentication.
 * @param {string} activityMessage - The message describing the user activity.
 * @returns {Promise} - A promise that resolves with the response or rejects with an error.
 */
const manualLogger = async (accessToken, activityMessage) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/data/activity-logs/`, // Replace with your actual endpoint
      { activity: activityMessage }, // Activity message to send in the body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the Authorization header
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error registering log:", error); // Log the error for debugging
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default manualLogger;
