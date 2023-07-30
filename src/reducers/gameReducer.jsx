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
  category: null,
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
        case "SET_CATEGORY":
        return {
          ...state,
          category: action.payload,
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
    default:
      return state;
  }
};

export default gameReducer;
