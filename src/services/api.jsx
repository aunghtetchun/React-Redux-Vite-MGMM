// api.js
import axios from "axios";

const BASE_URL = "https://modgamesmm.com/api"; // Replace with your actual API base URL

// Function to perform login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

// Function to perform user registration
export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// Function to fetch user data using the provided token
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category data");
  }
};
export const getPopularGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/game/popular`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch popular games data");
  }
};
export const getGameDetails = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch popular games data");
  }
};
