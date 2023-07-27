import { getPopularGames, getGameDetails, getRelatedGames, getAllGames } from "../services/api";

export const setPopularGames = (popular_games) => ({
  type: "SET_POPULAR_GAMES",
  payload: popular_games,
});

export const fetchPopularGames = () => {
  return async (dispatch) => {
    try {
      const response = await getPopularGames();
      // console.log(response.games);
      dispatch(setPopularGames(response.games));
    } catch (error) {
      console.error("Error fetching popular_games:", error);
    }
  };
};

export const setGameDetails = (game) => ({
  type: 'SET_GAME_DETAILS',
  payload: game,
});

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
      const response=await getRelatedGames(id);
      console.log(response.related_games);
      dispatch(setRelatedGames(response.related_games));
    } catch (error) {
      console.error('Error fetching related games:', error);
    }
  };
};
export const setAllGames = (all_games) => ({
  type: "SET_ALL_GAMES",
  payload: all_games,
});

export const fetchAllGames = (category_id) => {
  return async (dispatch) => {
    try {
      const response = await getAllGames(category_id);
      // console.log(response.games);
      dispatch(setAllGames(response.games.data));
    } catch (error) {
      console.error("Error fetching all_games:", error);
    }
  };
};