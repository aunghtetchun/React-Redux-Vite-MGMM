import { fetchPopularGames } from "../actions/gameActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
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
        <h3 className="col-12 ps-2">Most Popular Games</h3>
        {popular_games &&
          popular_games.map((game) => (
            <div className="col-12 col-md-6 col-lg-4" onClick={()=>seeGame(game.slug)} key={game.id}>
              <Card className="m-2 shadow">
                <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
                  <div className="col-3 p-1">
                    <img src={game.logo} alt={game.title} className="w-100 gcard_logo" />
                  </div>
                  <div className="col-9 ps-3">
                    <h6 className="gcard_title mb-0">{game.name}</h6>
                    <p className="mb-0 p-0"> Version : {game.version}</p>
                    <p className="mb-0">
                      {game.size} ,
                      <span className="fw-bold">
                        { game.type.toLowerCase().includes("online") && game.type.toLowerCase().includes("offline") ? "Online & Offline": game.type.toLowerCase().includes("online")
                          ? "Online" 
                          : "Offline"}
                      </span>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}
