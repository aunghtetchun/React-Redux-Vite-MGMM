import React from "react";
import { useState } from "react";
import { Badge, Card, Placeholder } from "react-bootstrap";
import { FiArrowUp, FiEye, FiGift } from "react-icons/fi";

export default function CardItem({ game }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <>
   
    <Card id={game.slug} className="m-1 shadow">
        <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
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
            <p className="mb-0 p-0 fs-13"> Version : {game.version}</p>
            <p className="mb-0 fs-13">
              {game.size} ,
              <span className="fw-bold">
                {game.type.toLowerCase().includes("online") &&
                game.type.toLowerCase().includes("offline")
                  ? "Online & Offline"
                  : game.type.toLowerCase().includes("online")
                  ? "Online"
                  : "Offline"}
              </span>
            </p>
            <div className="g_card_badge text-right">
              {game.new == 1 ? (
                <Badge bg="danger" className="font-weight-bold card_badge">
                  <FiGift /> <span> New</span>
                </Badge>
              ) : game.new == 2 ? (
                <Badge bg="success" className="font-weight-bold card_badge">
                  <FiArrowUp />
                  Update
                </Badge>
              ) : (
                ""
              )}
              <br />
              <Badge bg="primary" className="font-weight-bold card_badge">
                <FiEye />
                <span> {game.count}</span>
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
    
      
    </>
  );
}
