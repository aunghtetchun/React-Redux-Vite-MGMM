import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAllGames, fetchAllGamesByCategory, setCurrentPage, setCurrentUrl, setMoreGames, setSeeMore, setTimeoutAction } from "../actions/gameActions";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";
import TopNav from "../components/TopNav";
import { getMoreGames } from "../services/api";

export default function Games() {
  const location = useLocation();
  const url = location.pathname; 
  const navigate=useNavigate();
  // const isCategory = location.pathname.includes('/category');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const all_games = useSelector((state) => state.gameReducer.all_games);
  const current_status = useSelector((state) => state.gameReducer.current_status);
  const search_status = useSelector((state) => state.gameReducer.search_game_status);
  const search_keyword = useSelector((state) => state.gameReducer.search_keyword);
  const prevScrollPosition = useSelector((state) => state.gameReducer.scroll_position_game);
  const page_number=useSelector((state) => state.gameReducer.current_page);
  const seemore=useSelector((state) => state.gameReducer.seemore);
  
  const containerRef = useRef(null);
  const { category_id } = useParams();

  const loadMore = useCallback(async () => {
    dispatch(setCurrentPage(page_number+1));
    try {
      if(seemore){
        const response = await getMoreGames(page_number,category_id,search_keyword);
        if (response.games.data.length < 1) {
          dispatch(setSeeMore(false));
        } else {
          dispatch(setMoreGames(response.games.data));
          dispatch(setTimeoutAction(response.title));
        }
      }
      
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }, [dispatch, page_number,category_id,search_keyword,seemore]);
  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom =
    container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    // dispatch(setScrollPositionGame(container.scrollTop));
    if (distanceToBottom <= threshold) {
      loadMore();
    }
  };
  useEffect(() => {
      if(category_id){
        if(current_status == 'category' ) {
          dispatch(fetchAllGamesByCategory(category_id));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
      else{
        if(current_status == 'games') {
          dispatch(fetchAllGames());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
  }, [dispatch,category_id,current_status]);


  useEffect(() => {
    dispatch(setCurrentUrl(url));
  }, [dispatch,url]);

  useEffect(() => {
    // Restore the scroll position when coming back to the component
    const targetElement = document.getElementById(prevScrollPosition);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'auto', // Use 'auto' for instant scrolling without animation
        block: 'nearest',     // Scroll to the top of the element
        inline: 'nearest'   // Scroll horizontally to the nearest edge
      });
    }
  }, [prevScrollPosition]);

  const touchStartX = useRef(0);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 100;

    if (deltaX > threshold) {
      navigate('/category')
    } else if (deltaX < threshold) {
      navigate('/softwares')
    }
  };



  return (
    <>
      <TopNav position={"/games"} />
      {loading ? (
        <LoadingCard count={12} />
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center max_height align-items-center"
        >
        {search_status == 'not_found' ? <h4 className='mt-5'>No Game Found</h4> :''}
          {all_games && search_status != 'not_found' ?
            all_games.map((game) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={game.id}
              >
                <CardItem game={game} />
              </div>
            )): ''}
          {seemore && all_games.length > 20 ?
            <div className="mb-5 mt-3 pb-3">
              <Spinner animation="border" variant="success" />
            </div>
          :''}
        </div>
      )}
    </>
  );
}
