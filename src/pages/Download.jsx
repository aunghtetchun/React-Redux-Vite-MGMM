import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RelatedGames from "../components/RelatedGames";

export default function Download() {
  const { slug } = useParams();
  const game = useSelector((state) => state.gameReducer.game);
  let navigate = useNavigate();
  const back = (slug) => {
    navigate(`/games/${slug}`);
  };
  if (!game) {
    return (
      <button
        onClick={() => back(slug)}
        className="btn col-12 col-md-6 mt-5 mx-auto btn-danger py-2"
      >
        Back To Game
      </button>
    );
  }

  return (
    <>
      <div className="card px-0 shadow">        
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{game.name}</h4>
            <hr className="col-12 px-0" />
          {game.link1 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={game.link1}
                className="btn btn-primary px-3 py-2  w-100"
              >
                {game.name_1}
              </a>
            </div>
          )}

          {game.link2 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={game.link2}
                className="btn btn-primary px-3 py-2  w-100"
              >
                {game.name_2}
              </a>
            </div>
          )}
          {game.link3 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a
                href={game.link3}
                className="btn btn-primary px-3 py-2  w-100"
              >
                {game.name_3}
              </a>
            </div>
          )}
        </div>
        <div className="card-footer text-center">
            <h6 className="fw-bold">{game.count} ယောက် ဒေါင်းထားပါတယ်</h6>
        </div>
      </div>
      <RelatedGames id={game.category_id} />      

    </>
  );
}
