const initialState = {
    adults: [],
    related_adults: [],
    adult: null,
    message:null,
    loading: false,
    page:2,
    scroll_position: 0,
    search_status: null, 
    see_more:true,
  };
  
  const adultReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_ADULTS":
        return {
          ...state,
          adults: action.payload,
        };
        case "SET_SEARCH_DATA":
        return {
            ...state,
            adults: action.payload,
        };
        case "SET_MORE_ADULTS":
        return {
            ...state,
            adults: [...state.adults, ...action.payload], // Add the new data to the existing array
        };
      case "SET_ADULT_DETAILS":
        return {
          ...state,
          adult: action.payload,
        };
      case "SET_RELATED_ADULTS":
        return {
          ...state,
          related_adults: action.payload,
        };
        case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
        case "SET_STATUS":
            return {
              ...state,
              search_status: action.payload,
            };
        case "SET_SEE_MORE":
          return {
            ...state,
            see_more: action.payload,
        };
        case "SET_PAGE":
            return {
              ...state,
              page: action.payload,
            };
        case "SET_SCROLL_POSITION":
            return {
            ...state,
            scroll_position: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adultReducer;
  