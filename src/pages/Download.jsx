import React, { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../actions/gameActions";
import RelatedGames from "../components/RelatedGames";

export default function Download() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const game = useSelector((state) => state.gameReducer.game);  /// state ယူတဲ့အဆင့်
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the game details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchGameDetails(slug));
  }, [dispatch,slug]);

  
  if (!game) {
    return <div>Game not found.</div>;
  }


  return (
    <>
      <div className="card col-12 px-0 shadow mt-3">        
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{game.name}</h4>
            <hr className="col-12 px-0" />
          {game.link1 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a target="_blank" rel="noopener noreferrer"
                href={`https://modgamesmm.com/download/${game.slug}/link1/game`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload/> {game.name_1}
              </a>
            </div>
          )}

          {game.link2 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a target="_blank" rel="noopener noreferrer"
               href={`https://modgamesmm.com/download/${game.slug}/link2/game`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload/> {game.name_2}
              </a>
            </div>
          )}
          {game.link3 && (
            <div className="col-12 col-md-6 col-lg-4 p-2">
              <a target="_blank" rel="noopener noreferrer"
                href={`https://modgamesmm.com/download/${game.slug}/link3/game`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload/> {game.name_3}
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
