const initialState = {
    softwares: [],
    related_softwares: [],
    software: null,
    message:null,
    loading: false,
    page:2,
    scroll_position: 0,
    search_status: null, 
    see_more:true,
  };
  
  const softwareReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_SOFTWARES":
        return {
          ...state,
          softwares: action.payload,
        };
        case "SET_SEARCH_DATA":
        return {
            ...state,
            softwares: action.payload,
        };
        case "SET_MORE_SOFTWARES":
        return {
            ...state,
            softwares: [...state.softwares, ...action.payload], // Add the new data to the existing array
        };
      case "SET_SOFTWARE_DETAILS":
        return {
          ...state,
          software: action.payload,
        };
      case "SET_RELATED_SOFTWARES":
        return {
          ...state,
          related_softwares: action.payload,
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
  
  export default softwareReducer;
  