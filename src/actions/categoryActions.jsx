// actions/categoryActions.js
import { getCategories } from "../services/api";

export const setCategories = (categories) => ({
    type: "SET_CATEGORIES",
    payload: categories,
  });
  
  // A sample async action to fetch categories (you need to modify this based on your API)
  export const fetchCategories = () => {
    return async (dispatch) => {
      try {
        // Replace this with your actual API call to fetch categories
        const response = await getCategories();
        // Dispatch the action to set the categories in the store
        dispatch(setCategories(response.category));

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  };
  