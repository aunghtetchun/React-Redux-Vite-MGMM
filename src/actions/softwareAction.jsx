import { getAllSoftwares, getSoftwareDetails, searchSoftwares } from "../services/api";

export const setAllSoftwares = (softwares) => ({
    type: "SET_ALL_SOFTWARES",
    payload: softwares,
  });
  export const setMoreSoftwares = (softwares) => ({
    type: "SET_MORE_SOFTWARES",
    payload: softwares,
  });
  export const setLoading = (isLoading) => {
    return { type: "SET_LOADING", payload: isLoading };
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
  export const fetchAllSoftwares = () => {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await getAllSoftwares();
        dispatch(setAllSoftwares(response.softwares.data));
        dispatch(setSearchStatus('all_softwares'));
        dispatch(setPageNumber(2));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching softwares:", error);
      }
    };
  };
export const setSoftwareDetails = (software) => ({
    type: 'SET_SOFTWARE_DETAILS',
    payload: software,
  });
  
  export const fetchSoftwareDetails = (slug) => {
    return async (dispatch) => {
      try {
        const response=await getSoftwareDetails(slug);
        dispatch(setSoftwareDetails(response.software));
      } catch (error) {
        console.error('Error fetching software details:', error);
      }
    };
  }
  export const setSearchData = (softwares) => ({
    type: 'SET_SEARCH_DATA',
    payload: softwares,
  });
  
  export const fetchSoftwaresSearch = (search_value) => {
    return async (dispatch) => {
      try {
        if(search_value.length==0){
            dispatch(setSearchStatus('found'));
            dispatch(setPageNumber(2));
        }else{
            dispatch(setLoading(true));
            const response=await searchSoftwares(search_value);
            // console.log(response);
            dispatch(setLoading(false));
            if(response.softwares.data.length > 0) {
                dispatch(setSearchData(response.softwares.data));
                dispatch(setPageNumber(100));
                dispatch(setSearchStatus('search_softwares'));
            }else if(response.softwares.data.length == 0){
                dispatch(setSearchStatus('not_found'));
            }
        }       
      } catch (error) {
        console.error('Error fetching software Search:', error);
      }
    };
  }