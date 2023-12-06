import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Badge, Card, Placeholder } from "react-bootstrap";
import { FiArrowUp, FiEye, FiGift, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setScrollPositionGame } from "../actions/gameActions";
import { AuthContext } from "../contexts/AuthContext";
import { deleteSaveGame } from "../services/api";

export default function CardItem({ game,user_id }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  let navigate = useNavigate();
  const dispatch=useDispatch();
  const { user,games,setGames } = useContext(AuthContext);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const deleteSave = async() => {
      const post_id=game.id;
         await deleteSaveGame(post_id, user_id,user.oldToken);
        const newGames = games.filter((game) => game.id !== post_id);
        setGames(newGames)
  }
  const seeGame = (slug) => {
    navigate(`/games/${slug}`);
    dispatch(setScrollPositionGame(slug));
    // const url = `/games/${slug}`;
    // window.open(url, '_blank');
  };
  return (
    <>
   
    <Card id={game.slug} className="m-1 shadow py-1" >
       {user_id &&<button onClick={deleteSave} className="btn p-0 pb-1 px-1 btn-danger save_delete "><FiX/></button>}

        <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center" onClick={() => seeGame(game.slug)}>
          <div className="col-3  pe-3">
            {game.logo ? (
              <img
                src={game.logo}
                alt={game.title}
                className={`w-100 gcard_logo ${
                  imageLoaded ? "d-block" : "d-none"
                }`}
                onLoad={handleImageLoad}
              />
            ) : (
              <Placeholder
                as="img"
                animation="glow"
                xs={12}
                className={`gcard_logo ${!imageLoaded ? "d-block" : "d-none"}`}
              />
            )}
          </div>
          <div className="col-9 ">
            <h6 className="gcard_title mb-0">{game.name}</h6>
            <p className="mb-0 text-muted p-0 py-1 fs-13"> Version : {game.version}</p>
            <p className="mb-0 fs-13">
              <span className="text-uppercase">{game.size}</span> ,
                {game.type.toLowerCase().includes("online") &&
                game.type.toLowerCase().includes("offline")
                  ? <span><span className="fw-bold text-success">Online </span> & <span className="fw-bold text-danger"> Offline</span></span>
                  : game.type.toLowerCase().includes("online")
                  ? <span className="fw-bold text-success">Online</span>
                  : <span className="fw-bold text-danger">Offline</span>}
            </p>
            <div className="g_card_badge text-right">
              {game.new == 1  ?  (
                <Badge bg="danger" className="font-weight-bold card_badge">
                  <FiGift />&nbsp; <span>New</span>
                </Badge>
              ) : game.new == 2  ? (
                <Badge bg="success" className="font-weight-bold card_badge">
                  <FiArrowUp />
                  Update
                </Badge>
              ) : (
                ""
              )}
              <br />
              <Badge className="font-weight-bold bg_viewer card_badge">
                <FiEye />
                <span>&nbsp; {game.count}</span>
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
    
      
    </>
  );
}