import { fetchAllGames, setMoreGames, setTitle } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
import LoadingCard from "./LoadingCard";
import { getAllGamesByCategory } from "../services/api";
import { useCallback } from "react";
import { Spinner } from "react-bootstrap";

export default function AllGames({ category_id }) {
  const [see_more, setSeeMore]=useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const all_games = useSelector((state) => state.gameReducer.all_games);
  const [page_number, setPageNumber] = useState(2);
  let navigate = useNavigate();
  const containerRef = useRef(null);

  const loadMore = useCallback(async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
      try {
        const response = await getAllGamesByCategory(page_number,category_id); 
        if(response.games.data.length<1){
          setSeeMore(false);
        }else{
          dispatch(setMoreGames(response.games.data));
          dispatch(setTitle(response.title));
          setSeeMore(true);
        }
        
      } catch (error) {
        console.error('Error fetching games:', error);
      }
  }, [dispatch, page_number,category_id]); 
  

  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    if (distanceToBottom <= threshold) {
      loadMore();
    }
  };


  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    dispatch(fetchAllGames(category_id));
  }, [dispatch, category_id]);
  const seeGame = (slug) => {
    navigate(`/games/${slug}`);
  };

  return (
    <>
     {loading ? <LoadingCard count={12}/>
    : 
      <div ref={containerRef} onScroll={handleScroll} className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center max_height align-items-center">
        {all_games &&
          all_games.map((game) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              onClick={() => seeGame(game.slug)}
              key={game.id}
            >
              <CardItem game={game} />

            </div>
          ))}
          {see_more && 
           <div className="mb-5 mt-3 pb-3">
            <Spinner animation="border" variant="success" />
            </div>
          }
      </div>
}
    </>
  );
}

import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllGames, fetchAllGamesByCategory, setCurrentUrl, setMoreGames } from "../actions/gameActions";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";
import TopNav from "../components/TopNav";
import { getMoreGames } from "../services/api";

export default function Games() {
  const [see_more, setSeeMore] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const all_games = useSelector((state) => state.gameReducer.all_games);
  const [page_number, setPageNumber] = useState(2);
  let navigate = useNavigate();
  const containerRef = useRef(null);
  const { category_id } = useParams();
  alert(category_id);
  const loadMore = useCallback(async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    try {
      const response = await getMoreGames(page_number,category_id);
      if (response.games.data.length < 1) {
        setSeeMore(false);
      } else {
        dispatch(setMoreGames(response.games.data));
        dispatch(setTimeout(response.title));
        setSeeMore(true);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }, [dispatch, page_number,category_id]);

  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom =
    container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    if (distanceToBottom <= threshold) {
      loadMore();
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!all_games || all_games.length === 0) {
      if(category_id){
        alert(category_id);
        dispatch(fetchAllGamesByCategory(category_id));
      }else{
        dispatch(fetchAllGames());
      }
    }
  }, [dispatch,all_games,category_id]);

  const seeGame = (slug) => {
    navigate(`/games/${slug}`);
  };

  useEffect(() => {
    dispatch(setCurrentUrl('/games'));
  }, [dispatch]);

  return (
    <>
      <TopNav position={"/games"} />
      {loading ? (
        <LoadingCard count={12} />
      ) : (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center max_height align-items-center"
        >
          {all_games &&
            all_games.map((game) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                onClick={() => seeGame(game.slug)}
                key={game.id}
              >
                <CardItem game={game} />
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
