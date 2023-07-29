const initialState = {
    softwares: [],
    related_softwares: [],
    software: null,
    message:null,
    loading: false,
  };
  
  const softwareReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_SOFTWARES":
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
      default:
        return state;
    }
  };
  
  export default softwareReducer;
  