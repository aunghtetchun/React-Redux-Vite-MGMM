import { fetchPopularGames, setCurrentUrl } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import CardItem from "../components/CardItem";
import LoadingCard from "../components/LoadingCard";

export default function PopularGames() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.gameReducer.loading);
  const popular_games = useSelector((state) => state.gameReducer.popular_games);
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (!popular_games || popular_games.length === 0) {
        dispatch(fetchPopularGames());
    }
  }, [dispatch,popular_games]);

  useEffect(() => {
    dispatch(setCurrentUrl('/'));
  }, [dispatch]);
  
  const seeGame = (slug, e) => {
    e.stopPropagation(); // Prevent click event from propagating to CardItem
    navigate(`/games/${slug}`);
  };
  if (!popular_games){
    return <LoadingCard count={12}/>
  }
  return (
    <>
    <TopNav position={'/'}/>
     {loading ? <LoadingCard count={12}/>
    : 
      <div className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
        {/* <h3 className="col-12 ps-2">Most Popular Games</h3> */}
        {popular_games &&
          popular_games.map((game) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              onClick={(e) => seeGame(game.slug, e)}
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