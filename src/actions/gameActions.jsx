import { getPopularGames, getGameDetails, getRelatedGames, getAllGames, requestGame, getCategories, getAllGamesByCategory, searchGames } from "../services/api";

export const setPopularGames = (popular_games) => ({
  type: "SET_POPULAR_GAMES",
  payload: popular_games,
});

export const fetchPopularGames = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await getPopularGames();
      // console.log(response.games);
      dispatch(setPopularGames(response.games));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching popular_games:", error);
    }
  };
};

export const setGameDetails = (game) => ({
  type: 'SET_GAME_DETAILS',
  payload: game,
});
export const setCurrentPage = (current_page) => {
  return { type: "SET_CURRENT_PAGE", payload: current_page };
};
export const fetchGameDetails = (slug) => {
  return async (dispatch) => {
    try {
      const response=await getGameDetails(slug);
      dispatch(setGameDetails(response.game));
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };
};
export const setRelatedGames = (related_games) => ({
  type: 'SET_RELATED_GAMES',
  payload: related_games,
});

export const fetchRelatedGames = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response=await getRelatedGames(id);
      dispatch(setRelatedGames(response.related_games));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching related games:', error);
    }
  };
};
export const setAllGames = (all_games) => ({
  type: "SET_ALL_GAMES",
  payload: all_games,
});
export const setMoreGames = (all_games) => ({
  type: "SET_MORE_GAMES",
  payload: all_games,
});

export const fetchAllGames = () => {
  return async (dispatch) => {
    try {
      dispatch(setKeyword(null));
      dispatch(setLoading(true));
      dispatch(setCurrentPage(2));
      dispatch(setSeeMore(true));
      const response = await getAllGames();
      // console.log(response.games);
      dispatch(setAllGames(response.games.data));
      dispatch(setTitle(response.title));
      dispatch(setCurrentStatus('close'));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching all_games:", error);
    }
  };
};

export const setMessage = (message) => ({
  type: "SET_MESSAGE",
  payload: message,
});
export const clearMessage = () => ({
  type: "CLEAR_MESSAGE",
});
export const setTitle = (title) => ({
  type: "SET_TITLE",
  payload: title,
});
export const setCurrentUrl = (current_url) => ({
  type: "SET_CURRENT_URL",
  payload: current_url,
});
export const setCurrentStatus = (current_status) => ({
  type: 'SET_CURRENT_STATUS',
  payload: current_status,
});
export const setSeeMore = (seemore) => ({
  type: 'SET_SEEMORE',
  payload: seemore,
});


export const submitGameRequest = (formData) => {
  return async (dispatch) => {
    try {
      const response = await requestGame(formData);
      dispatch(setMessage(response.finish));
      // console.log(response.data);
    } catch (error) {
      console.error('Error submitting game request:', error);
    }
  };
};

export const setLoading = (isLoading) => {
  return { type: "SET_LOADING", payload: isLoading };
};


export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const fetchAllGamesByCategory = (category_id) => {
  return async (dispatch) => {
    try {
      dispatch(setCurrentPage(2));
      dispatch(setSeeMore(true));
      dispatch(setKeyword(null));
      dispatch(setLoading(true));
      if(category_id!=null){
        const response = await getAllGamesByCategory(category_id);
        dispatch(setAllGames(response.games.data));
        dispatch(setTitle(response.title));
        dispatch(setCurrentStatus('close'));
        dispatch(setLoading(false));
      }else{
        dispatch(fetchAllGames());
      }
      // console.log(response.games);
      
    } catch (error) {
      console.error("Error fetching all_games:", error);
    }
  };
};

// A sample async action to fetch categories (you need to modify this based on your API)
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await getCategories();
      dispatch(setCategories(response.category));

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
};

export const setGameSearchStatus = (status) => {
  return { type: "SET_GAME_STATUS", payload: status };
};

export const setKeyword = (search_keyword) => ({
  type: 'SET_KEYWORD',
  payload: search_keyword,
});
export const setScrollPositionGame= (current_position) => {
  return { type: "SET_SCROLL_POSITION_GAME", payload: current_position };
};
export const fetchGamesSearch = (search_value) => {
  return async (dispatch) => {
    try {
      dispatch(setKeyword(search_value));
      dispatch(setCurrentPage(2));
      dispatch(setCurrentStatus('close'));
      dispatch(setSeeMore(true));
      if(search_value.length==0){
          dispatch(setGameSearchStatus('empty'));
      }else{
          dispatch(setLoading(true));
          const response=await searchGames(search_value);
          dispatch(setTitle(response.title));
          // console.log(response);
          dispatch(setLoading(false));
          if(response.games.data.length > 0) {
              dispatch(setAllGames(response.games.data));
              dispatch(setGameSearchStatus('found'));
          }else if(response.games.data.length == 0){
              dispatch(setGameSearchStatus('not_found'));
          }
      }       
    } catch (error) {
      console.error('Error fetching game Search:', error);
    }
  };
}
export const setTimeoutAction = (title) => {
  return {
    type: 'SET_TIMEOUT',
    payload: title,
  };
};

