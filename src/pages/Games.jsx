import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAllGames, fetchAllGamesByCategory, setCurrentUrl, setMoreGames, setTimeoutAction } from "../actions/gameActions";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";
import TopNav from "../components/TopNav";
import { getMoreGames } from "../services/api";

export default function Games() {
  const location = useLocation();
  const url = location.pathname; 
  const isCategory = location.pathname.includes('/category');
  const [see_more, setSeeMore] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const all_games = useSelector((state) => state.gameReducer.all_games);
  const current_status = useSelector((state) => state.gameReducer.current_status);
  const search_status = useSelector((state) => state.gameReducer.search_game_status);
  const search_keyword = useSelector((state) => state.gameReducer.search_keyword);
  const [page_number, setPageNumber] = useState(2);
  let navigate = useNavigate();
  const containerRef = useRef(null);
  const { category_id } = useParams();

  const loadMore = useCallback(async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    try {
      const response = await getMoreGames(page_number,category_id,search_keyword);
      if (response.games.data.length < 1) {
        setSeeMore(false);
      } else {
        dispatch(setMoreGames(response.games.data));
        dispatch(setTimeoutAction(response.title));
        setSeeMore(true);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }, [dispatch, page_number,category_id,search_keyword]);
  const handleScroll = () => {
    const container = containerRef.current;
    const distanceToBottom =
    container.scrollHeight - (container.scrollTop + container.clientHeight);
    const threshold = 10;
    if (distanceToBottom <= threshold) {
      loadMore();
    }
  };
  console.log(url);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
      if(category_id){
        if(current_status != 'category' ) {
          dispatch(fetchAllGamesByCategory(category_id));
        }
      }
      else{
        if(current_status != 'category' && current_status != 'search') {
          dispatch(fetchAllGames());
        }
      }
  }, [dispatch,category_id,current_status]);

  const seeGame = (slug) => {
    navigate(`/games/${slug}`);
  };

  useEffect(() => {
    dispatch(setCurrentUrl(url));
  }, [dispatch,url]);


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
        {search_status == 'not_found' ? <h4 className='mt-5'>No Game Found</h4> :''}
          {all_games && search_status != 'not_found' ?
            all_games.map((game) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                onClick={() => seeGame(game.slug)}
                key={game.id}
              >
                <CardItem game={game} />
              </div>
            )): ''}
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
