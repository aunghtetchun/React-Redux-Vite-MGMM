const initialState = {
    posts: [],
    related_posts: [],
    post: null,
    message:null,
    post_loading: false,
    page:2,
    scroll_position: 0,
    search_status: null, 
    see_more:true,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALL_POSTS":
        return {
          ...state,
          posts: action.payload,
        };
        case "SET_SEARCH_DATA":
        return {
            ...state,
            posts: action.payload,
        };
      case "SET_POST_DETAILS":
        return {
          ...state,
          post: action.payload,
        };
        case "SET_LOADING":
        return {
          ...state,
          post_loading: action.payload,
        };
        case "SET_STATUS":
            return {
              ...state,
              search_status: action.payload,
            };
        
      default:
        return state;
    }
  };
  
  export default postReducer;
  