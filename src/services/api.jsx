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
    if (error.response && error.response.data.error) {
      // If there are validation errors in the API response, update the errors state
      return error;
    } else {
      // Handle other types of errors, e.g., network errors
      console.error('An error occurred:', error);
      throw new Error(error);
    }
  }
};

// Function to perform user registration
export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      // If there are validation errors in the API response, update the errors state
      return error;
    } else {
      // Handle other types of errors, e.g., network errors
      console.error('An error occurred:', error);
      throw new Error(error);
    }
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

export const getMoreGames = async (page_number,category_id,search_keyword) => {
  try {
    // console.log(category_id);
    if(search_keyword != null){
      const response = await axios.get(`${BASE_URL}/games/search/${search_keyword}?page=${page_number}`);
      return response.data;
    } 
    else if(category_id != null){
      const response = await axios.get(`${BASE_URL}/games/category/${category_id}?page=${page_number}`);
      return response.data;
    } else {
      const response = await axios.get(`${BASE_URL}/games?page=${page_number}`);
      return response.data;
    }
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

export const getAllGames = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/games`);
      return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all games data");
  }
};
export const getAllGamesByCategory = async (category_id) => {
  try {
      const response = await axios.get(`${BASE_URL}/games/category/${category_id}`);
      return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all games data");
  }
};
export const searchGames = async (search_value) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/search/${search_value}`);
    return response.data;
  } catch (error) {
    throw new Error("search failed");
  }
};
export const getAllSoftwares = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/softwares`);
      return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all softwares data");
  }
};
export const getMoreSoftwares = async (page_number) => {
  try {
      if(page_number<100){
        const response = await axios.get(`${BASE_URL}/softwares?page=${page_number}`);
        return response.data;
      }
      
  } catch (error) {
    throw new Error("Failed to fetch all softwares data");
  }
};
export const getSoftwareDetails = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/softwares/details/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch software details data");
  }
};

export const searchSoftwares = async (search_value) => {
  try {
    const response = await axios.get(`${BASE_URL}/softwares/search/${search_value}`);
    return response.data;
  } catch (error) {
    throw new Error("search failed");
  }
};

export const saveGame = async ( post_id,user_id,token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/save-game`,
      { user_id, post_id }, // Pass the data object for the POST request with the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      // If there are validation errors in the API response, update the errors state
      return error;
    } else {
      // Handle other types of errors, e.g., network errors
      console.error('An error occurred:', error);
      throw new Error(error);
    }
  }
};
export const deleteSaveGame = async ( post_id,user_id,token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-save-game`, {
      data: { user_id, post_id }, // Pass the data object for DELETE request with the request body
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      // If there are validation errors in the API response, update the errors state
      return error;
    } else {
      // Handle other types of errors, e.g., network errors
      console.error('An error occurred:', error);
      throw new Error(error);
    }
  }
};