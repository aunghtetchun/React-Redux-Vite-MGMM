import { getPopularGames, getGameDetails } from "../services/api";

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
      console.log(response.game);
      dispatch(setGameDetails(response.game));
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };
};