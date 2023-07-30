import React, { useEffect } from "react"; // Import 'React' from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRelatedGames } from "../actions/gameActions";

export default function RelatedGames({ id }) {
  const dispatch = useDispatch();
  const related_games = useSelector((state) => state.gameReducer.related_games);
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch the related games when the component mounts or when the 'id' prop changes
    dispatch(fetchRelatedGames(id));
  }, [dispatch,id]);

  const seeGame = (slug, e) => {
    e.stopPropagation(); // Prevent click event from propagating to CardItem
    navigate(`/games/${slug}`);
  };
  // console.log('related games');

  return (
    <>
      {related_games && (
        <div className="col-12 mx-auto px-0 mt-3 col-md-12 col-lg-9 shadow d-flex flex-wrap justify-content-center align-items-center">
          {related_games.map((game) => (
            <div
              key={game.id}
              className="card related_game_card col-3 col-lg col-md game_card px-1 rounded-0"
              onClick={(e) => seeGame(game.slug, e)}
            >
              <img className="card-img-top related_logo" src={game.logo} alt={game.name} />
              <div className="card-body p-1">
                <p className="card-title w-100 related_card_title">{game.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
