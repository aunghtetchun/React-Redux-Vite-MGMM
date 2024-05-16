import React, { useEffect, useRef, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllSoftwares, setMoreSoftwares, setPageNumber, setSeeMore } from '../actions/softwareAction';
import SoftwareCardItem from '../components/SoftwareCardItem';
import LoadingCard from '../components/LoadingCard';
import {  getMoreSoftwares } from '../services/api';
import Search from '../components/Search';

export default function Softwares() {
  const see_more=useSelector((state) => state.softwareReducer.see_more);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.softwareReducer.loading);
  const softwares = useSelector((state) => state.softwareReducer.softwares);
  const page_number = useSelector((state) => state.softwareReducer.page);
  const search_status = useSelector((state) => state.softwareReducer.search_status);
  let navigate = useNavigate();
  const containerRef = useRef(null);

  // Previous scroll position state to store the scroll position
  const prevScrollPosition = useSelector((state) => state.softwareReducer.scroll_position);

  const loadMore = useCallback(async () => {
    if(see_more){
      const nextPageNumber = page_number + 1;
      dispatch(setPageNumber(nextPageNumber));
      try {
        const response = await getMoreSoftwares(nextPageNumber);
        if (response.softwares.data.length < 1) {
          dispatch(setSeeMore(false));
        } else {
          dispatch(setMoreSoftwares(response.softwares.data));
        }
      } catch (error) {
        console.error('Error fetching softwares:', error);
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
    if (!softwares || softwares.length === 0 ) {
      dispatch(fetchAllSoftwares());
    }
  }, [dispatch, softwares]);

  const seeSoftware = (slug) => {
    navigate(`/softwares/${slug}`);
  };

  const getAll = () =>{
    dispatch(fetchAllSoftwares());
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
      <div className="col-12 px-0 ">
        <Search />
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
        {search_status == 'not_found' ? <h4 className='mt-3'>No Software Found</h4> :''}
        {softwares && search_status != 'not_found' ? 
            softwares.map((software) => (
              <div
                className="col-12 col-md-6"
                onClick={() => seeSoftware(software.slug)}
                key={software.id}
              >
                <SoftwareCardItem software={software} />
              </div>
            )) : ''}
        {see_more && search_status != 'search_softwares' && softwares.length>10  && search_status != 'not_found'?
            <div className="mb-5 mt-3 pb-3">
              <Spinner animation="border" variant="success" />
            </div>
          : ''}
        {search_status == 'search_softwares' ||  search_status == 'not_found' ?
            <button onClick={getAll} className="back_all shadow shadow-lg btn btn-success py-2 px-3">Back to All Softwares</button> : ''
        }
        </div>
      )}
    </>
  );
}
