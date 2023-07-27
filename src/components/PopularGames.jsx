import { fetchPopularGames } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";

export default function PopularGames() {
  const dispatch = useDispatch();
  const popular_games = useSelector((state) => state.gameReducer.popular_games);
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch the popular_games when the component mounts
    dispatch(fetchPopularGames());
  }, [dispatch]);

  const seeGame = (slug) =>{
    navigate(`/games/${slug}`);
  }

  return (
    <>
      <div className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
        {/* <h3 className="col-12 ps-2">Most Popular Games</h3> */}
        {popular_games &&
          popular_games.map((game) => (
            <div className="col-12 col-md-6 col-lg-4" onClick={()=>seeGame(game.slug)} key={game.id}>
               <CardItem game={game}/>
            </div>
          ))}
      </div>
    </>
  );
}