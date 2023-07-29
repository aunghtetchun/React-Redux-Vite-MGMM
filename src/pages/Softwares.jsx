import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllSoftwares, setMoreSoftwares, setPageNumber, setScrollPosition } from '../actions/softwareAction';
import SoftwareCardItem from '../components/SoftwareCardItem';
import LoadingCard from '../components/LoadingCard';
import {  getMoreSoftwares } from '../services/api';
import Search from '../components/Search';

export default function Softwares() {
  const [see_more, setSeeMore] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.softwareReducer.loading);
  const softwares = useSelector((state) => state.softwareReducer.softwares);
  const page_number = useSelector((state) => state.softwareReducer.page);
  let navigate = useNavigate();
  const containerRef = useRef(null);

  // Previous scroll position state to store the scroll position
  const prevScrollPosition = useSelector((state) => state.softwareReducer.scroll_position);

  const loadMore = useCallback(async () => {
    const nextPageNumber = page_number + 1;
    dispatch(setPageNumber(nextPageNumber));

    try {
      const response = await getMoreSoftwares(nextPageNumber);
      if (response.softwares.data.length < 1) {
        setSeeMore(false);
      } else {
        dispatch(setMoreSoftwares(response.softwares.data));
        setSeeMore(true);
      }
    } catch (error) {
      console.error('Error fetching softwares:', error);
    }
  }, [dispatch, page_number]);

  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom =
      container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    if (distanceToBottom <= threshold) {
      loadMore();
    }
    // Store the current scroll position in the state
    console.log('Scroll position')
    dispatch(setScrollPosition(container.scrollTop));
  };

  useEffect(() => {
    // Restore the scroll position when coming back to the component
    if (containerRef.current) {
        containerRef.current.scrollTop = prevScrollPosition;
    }
  }, [prevScrollPosition]);

  useEffect(() => {
    if (!softwares || softwares.length === 0) {
      dispatch(fetchAllSoftwares());
    }
  }, [dispatch, softwares]);

  const seeSoftware = (slug) => {
    navigate(`/softwares/${slug}`);
  };

  return (
    <>
      <div className="col-12 px-0 my-3">
        <Search />
      </div>
      {loading ? (
        <LoadingCard count={12} />
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center max_height align-items-center"
        >
          {softwares &&
            softwares.map((software) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                onClick={() => seeSoftware(software.slug)}
                key={software.id}
              >
                <SoftwareCardItem software={software} />
              </div>
            ))}
          {see_more && (
            <div className="mb-5 mt-3 pb-3">
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
