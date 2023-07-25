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
      <h5>Welcome From MGMM</h5>
      <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
        {popular_games &&
          popular_games.map((game) => (
            <div className="col-12 col-md-4" onClick={()=>seeGame(game.slug)} key={game.id}>
              <Card className="m-2">
                <Card.Body className="d-flex p-2 flex-wrap justify-content-center align-items-center">
                  <div className="col-3">
                    <img src={game.logo} alt={game.title} className="w-100" />
                  </div>
                  <div className="col-9 ps-3">
                    <h6>{game.name}</h6>
                    <p> Version : {game.version}</p>
                    <p>
                      {game.size} ,{" "}
                      <span className="fw-bold">
                        {game.type.toLowerCase().includes("online")
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
