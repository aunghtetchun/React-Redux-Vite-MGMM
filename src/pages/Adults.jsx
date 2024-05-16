import React, { useEffect, useRef, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllAdults, setMoreAdults, setPageNumber, setSeeMore } from '../actions/adultAction';
import AdultCardItem from '../components/AdultCardItem';
import LoadingCard from '../components/LoadingCard';
import {  getMoreAdults } from '../services/api';
import SearchAdults from '../components/SearchAdults';

export default function Adults() {
  const see_more=useSelector((state) => state.adultReducer.see_more);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.adultReducer.loading);
  const adults = useSelector((state) => state.adultReducer.adults);
  const page_number = useSelector((state) => state.adultReducer.page);
  const search_status = useSelector((state) => state.adultReducer.search_status);
  let navigate = useNavigate();
  const containerRef = useRef(null);

  console.log("hello", adults);


  // Previous scroll position state to store the scroll position
  const prevScrollPosition = useSelector((state) => state.adultReducer.scroll_position);

  const loadMore = useCallback(async () => {
    if(see_more){
      const nextPageNumber = page_number + 1;
      dispatch(setPageNumber(nextPageNumber));
      try {
        const response = await getMoreAdults(nextPageNumber);
        if (response.adults.data.length < 1) {
          dispatch(setSeeMore(false));
        } else {
          dispatch(setMoreAdults(response.adults.data));
        }
      } catch (error) {
        console.error('Error fetching adults:', error);
      }
    }
  }, [dispatch, page_number,see_more]);

  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom =
      container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    if (distanceToBottom <= threshold) {
      loadMore();
    }
    // Store the current scroll position in the state
    // dispatch(setScrollPosition(container.scrollTop));
  };

  useEffect(() => {
    // Restore the scroll position when coming back to the component
    const targetElement = document.getElementById(prevScrollPosition);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'auto', // Use 'auto' for instant scrolling without animation
        block: 'start',     // Scroll to the top of the element
        inline: 'nearest'   // Scroll horizontally to the nearest edge
      });
    }
  }, [prevScrollPosition]);
  // console.log(search_status);
  useEffect(() => {
    if (!adults || adults.length === 0 ) {
      dispatch(fetchAllAdults());
    }
  }, [dispatch, adults]);

  const seeAdult = (slug) => {
    navigate(`/adults/${slug}`);
  };

  const getAll = () =>{
    dispatch(fetchAllAdults());
  }

  const touchStartX = useRef(0);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 150;

    if (deltaX < -threshold) {
      console.log("Sliding left");
      navigate('/request')
    } else if (deltaX > threshold) {
      navigate('/games')
    }
  };

  return (
    <>
      <div 
      
      className="col-12 px-0 ">
        <SearchAdults />
      </div>
      {loading ? (
        <LoadingCard count={12} />
      ) : (
        <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
          ref={containerRef}
          onScroll={handleScroll}
          className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center max_height align-items-center"
        >
        {search_status == 'not_found' ? <h4 className='mt-3'>No Adult Found</h4> :''}
        {adults && search_status != 'not_found' ? 
            adults.map((adult) => (
              <div
                className="col-12 col-md-6"
                onClick={() => seeAdult(adult.slug)}
                key={adult.id}
              >
                <AdultCardItem adult={adult} />
              </div>
            )) : ''}
        {see_more && search_status != 'search_adults' && adults.length>10  && search_status != 'not_found'?
            <div className="mb-5 mt-3 pb-3">
              <Spinner animation="border" variant="success" />
            </div>
          : ''}
        {search_status == 'search_adults' ||  search_status == 'not_found' ?
            <button onClick={getAll} className="back_all shadow shadow-lg btn btn-success py-2 px-3">Back to All Adults</button> : ''
        }
        </div>
      )}
    </>
  );
}
