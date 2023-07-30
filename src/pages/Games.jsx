import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const category = useSelector((state) => state.gameReducer.category);
  const [page_number, setPageNumber] = useState(2);
  let navigate = useNavigate();
  const containerRef = useRef(null);

  const loadMore = useCallback(async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    try {
      const response = await getMoreGames(page_number,category);
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
  }, [dispatch, page_number,category]);

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
      dispatch(fetchAllGames());
    }
  }, [dispatch,all_games]);
  const seeGame = (slug) => {
    navigate(`/games/${slug}`);
  };

  useEffect(() => {
    dispatch(setCurrentUrl('/games'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllGamesByCategory(category));
  }, [dispatch,category]);

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
