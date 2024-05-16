import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAllGames, fetchAllGamesByCategory, setCurrentUrl, setAllGames, setCurrentPage, setLoading } from "../actions/gameActions";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";
import TopNav from "../components/TopNav";
import { getMoreGames } from "../services/api";
import { Pagination } from 'react-bootstrap';

export default function GameList() {
  const location = useLocation();
  const url = location.pathname; 
  const navigate=useNavigate();
  // const isCategory = location.pathname.includes('/category');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const all_games = useSelector((state) => state.gameReducer.all_games);
  const total_page = useSelector((state) => state.gameReducer.total_page);
  const current_status = useSelector((state) => state.gameReducer.current_status);
  const search_status = useSelector((state) => state.gameReducer.search_game_status);
  const search_keyword = useSelector((state) => state.gameReducer.search_keyword);
  const current_page=useSelector((state) => state.gameReducer.current_page);
  
  const containerRef = useRef(null);
  const { category_id } = useParams();

  
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

  const handlePageChange = useCallback(async (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(setLoading(true));
    const response = await getMoreGames(pageNumber,category_id,search_keyword);
    if(response.games.data.length > 0) {
      dispatch(setLoading(false));
      dispatch(setAllGames(response.games.data));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [dispatch,category_id,search_keyword]);

  return (
    <>
      <TopNav position={"/games"} />
      {loading ? (
        <LoadingCard count={12} />
      ) : (
        <div
          ref={containerRef}
          className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center"
        >
        {search_status == 'not_found' ? <h3 className='mt-5 text-center lh'>ဂိမ်းနာမည်အစစာလုံးကိုသာ ရိုက်ရှာပေးပါ... ဥပမာ Subway Surfer အစား Subway ဒါမှမဟုတ် Surfer လို့ရှာကြည့်ပေးပါ</h3> :''}
          {all_games && search_status != 'not_found' ?
            all_games.map((game) => (
              <div
                className="col-12 col-md-6"
                key={game.id}
              >
                <CardItem game={game} />
              </div>
            ))
            : ''}
            {search_status != 'not_found' &&  total_page != 1 ?
              <Pagination className="d-flex flex-wrap my-3">
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev onClick={() => handlePageChange(current_page - 1)} />
                {/* Dynamically generate pagination buttons based on totalPages */}
                {Array.from({ length: total_page }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={current_page === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next onClick={() => handlePageChange(current_page + 1)} />
                <Pagination.Last onClick={() => handlePageChange(total_page)} />
              </Pagination>
          : ''}
          
        </div>
      )}
    </>
  );
}
