import { getAllAdults, getAdultDetails, searchAdults } from "../services/api";

export const setAllAdults = (adults) => ({
    type: "SET_ALL_ADULTS",
    payload: adults,
  });
  export const setMoreAdults = (adults) => ({
    type: "SET_MORE_ADULTS",
    payload: adults,
  });
  export const setLoading = (isLoading) => {
    return { type: "SET_LOADING", payload: isLoading };
  };
  export const setSeeMore = (see_more) => {
    return { type: "SET_SEE_MORE", payload: see_more };
  };
  export const setSearchStatus = (status) => {
    return { type: "SET_STATUS", payload: status };
  };
  export const setPageNumber = (page_number) => {
    return { type: "SET_PAGE", payload: page_number };
  };
  export const setScrollPosition= (current_position) => {
    return { type: "SET_SCROLL_POSITION", payload: current_position };
  };
  export const fetchAllAdults = () => {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await getAllAdults();
        dispatch(setAllAdults(response.adults.data));
        dispatch(setSearchStatus('all_adults'));
        dispatch(setPageNumber(2));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching adults:", error);
      }
    };
  };
export const setAdultDetails = (adult) => ({
    type: 'SET_ADULT_DETAILS',
    payload: adult,
  });
  
  export const fetchAdultDetails = (slug) => {
    return async (dispatch) => {
      try {
        dispatch(setScrollPosition(slug));
        const response=await getAdultDetails(slug);
        dispatch(setAdultDetails(response.adult));
      } catch (error) {
        console.error('Error fetching adult details:', error);
      }
    };
  }
  export const setSearchData = (adults) => ({
    type: 'SET_SEARCH_DATA',
    payload: adults,
  });
  
  export const fetchAdultsSearch = (search_value) => {
    return async (dispatch) => {
      try {
        if(search_value.length==0){
            dispatch(setSearchStatus('found'));
            dispatch(setPageNumber(2));
        }else{
            dispatch(setLoading(true));
            dispatch(setSeeMore(true));
            const response=await searchAdults(search_value);
            // console.log(response);
            dispatch(setLoading(false));
            if(response.adults.data.length > 0) {
                dispatch(setSearchData(response.adults.data));
                dispatch(setPageNumber(100));
                dispatch(setSearchStatus('search_adults'));
            }else if(response.adults.data.length == 0){
                dispatch(setSearchStatus('not_found'));
            }
        }       
      } catch (error) {
        console.error('Error fetching adult Search:', error);
      }
    };
  }