const initialState = {
  popular_games: [],
  all_games: [],
  related_games: [],
  game: null,
  message:null,
  loading: false,
  title: null,
  current_url: '/',
  categories: [],
  current_status:'games',
  scroll_position_game: 0,
  search_game_status: null, 
  search_keyword: null, 
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POPULAR_GAMES":
      return {
        ...state,
        popular_games: action.payload,
      };
      case "SET_ALL_GAMES":
      return {
        ...state,
        all_games: action.payload,
      };
      case "SET_MORE_GAMES":
      return {
        ...state,
        all_games: [...state.all_games, ...action.payload], // Add the new data to the existing array
      };
      case "SET_CATEGORIES":
        return {
          ...state,
          categories: action.payload,
        };
    case "SET_GAME_DETAILS":
      return {
        ...state,
        game: action.payload,
      };
    case "SET_RELATED_GAMES":
      return {
        ...state,
        related_games: action.payload,
      };
      case "SET_CURRENT_STATUS":
        return {
          ...state,
          current_status: action.payload,
        };
      case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
      case "SET_CURRENT_URL":
        return {
          ...state,
          current_url: action.payload,
        };
      case "CLEAR_MESSAGE":
      return {
        ...state,
        message: null,
      };
      case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
      case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
      case "SET_KEYWORD":
      return {
        ...state,
        search_keyword: action.payload,
      };
      case "SET_GAME_STATUS":
        return {
        ...state,
        search_game_status: action.payload,
      };
      case "SET_SCROLL_POSITION_GAME":
        return {
        ...state,
        scroll_position_game: action.payload,
      };
      case "SET_GAME_SEARCH_DATA":
        return {
            ...state,
            all_games: action.payload,
        };
    default:
      return state;
  }
};

export default gameReducer;
