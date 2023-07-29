import { fetchAllGames, setMoreGames, setTitle } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
import LoadingCard from "./LoadingCard";
import { getAllGamesByCategory } from "../services/api";
import { useCallback } from "react";

export default function AllGames({ category_id }) {
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
        // console.log(response.games.data)
        dispatch(setMoreGames(response.games.data));
        dispatch(setTitle(response.title));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
  }, [dispatch, page_number,category_id]); // Pass any dependencies of `loadMore` here

  

  const handleScroll = () => {
    const container = containerRef.current;

    // Calculate the distance between the bottom of the container and the bottom of the scrollbar
    const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);

    // Define a threshold (in pixels) to decide when the scrollbar is considered at the bottom
    const threshold = 10;

    // Call the function when the scrollbar is close to the bottom (within the threshold)
    if (distanceToBottom <= threshold) {
      loadMore(); // Call your desired function here
    }
  };


  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // Fetch the all_games when the component mounts
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
        {/* <h3 className="col-12 ps-2">New Games</h3> */}
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
      </div>
}
    </>
  );
}
