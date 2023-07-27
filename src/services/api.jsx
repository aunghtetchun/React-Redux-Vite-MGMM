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
    const response = await axios.get(`${BASE_URL}/games/popular`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch popular games data");
  }
};
export const getAllGames = async (category_id) => {
  try {
    const params = {
      cat_id: category_id,
    };
    const response = await axios.get(`${BASE_URL}/games/`,{params});
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all games data");
  }
};
export const getGameDetails = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/details/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game details data");
  }
};

export const getRelatedGames=  async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/related/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch related games data");
  }
};

export const requestGame=  async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/request-game`, formData)
    return response.data;
  } catch (error) {
    throw new Error("Failed to post request game data");
  }
};
