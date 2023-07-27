import { fetchAllGames } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";

export default function AllGames({ category_id }) {
  const dispatch = useDispatch();
  const all_games = useSelector((state) => state.gameReducer.all_games);
  let navigate = useNavigate();

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
      <div className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
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
    </>
  );
}
