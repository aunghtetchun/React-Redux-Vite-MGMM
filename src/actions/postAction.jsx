import { getAllPosts, getPostDetails, searchPosts } from "../services/api";

export const setAllPosts = (posts) => ({
    type: "SET_ALL_POSTS",
    payload: posts,
  });

  export const setLoading = (isLoading) => {
    return { type: "SET_LOADING", payload: isLoading };
  };
 
  export const setSearchStatus = (status) => {
    return { type: "SET_STATUS", payload: status };
  };
 
  export const fetchAllPosts = () => {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await getAllPosts();
        dispatch(setAllPosts(response.accounts.data));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  };
export const setPostDetails = (post) => ({
    type: 'SET_POST_DETAILS',
    payload: post,
  });
  
  export const fetchPostDetails = (slug) => {
    return async (dispatch) => {
      try {
        const response=await getPostDetails(slug);
        dispatch(setPostDetails(response.account));
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
  }
  export const setSearchData = (posts) => ({
    type: 'SET_SEARCH_DATA',
    payload: posts,
  });
  
  export const fetchPostsSearch = (search_value) => {
    return async (dispatch) => {
      try {
        if(search_value.length==0){
            dispatch(setSearchStatus('found'));
            dispatch(setPageNumber(2));
        }else{
            dispatch(setLoading(true));
            dispatch(setSeeMore(true));
            const response=await searchPosts(search_value);
            // console.log(response);
            dispatch(setLoading(false));
            if(response.accounts.data.length > 0) {
                dispatch(setSearchData(response.accounts.data));
                dispatch(setPageNumber(100));
                dispatch(setSearchStatus('search_posts'));
            }else if(response.accounts.data.length == 0){
                dispatch(setSearchStatus('not_found'));
            }
        }       
      } catch (error) {
        console.error('Error fetching post Search:', error);
      }
    };
  }