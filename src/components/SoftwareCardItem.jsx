import React from "react";
import { useState } from "react";
import { Badge, Card, Placeholder } from "react-bootstrap";
import { FiArrowUp, FiEye, FiGift } from "react-icons/fi";

export default function SoftwareCardItem({ software }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <>
   
    <Card id={software.slug} className="m-1 shadow">
        <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
          <div className="col-3  pe-3">
            {software.logo ? (
              <img
                src={software.logo}
                alt={software.title}
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
            <h6 className="gcard_title mb-0">{software.name}</h6>
            <p className="mb-0 p-0 fs-13"> Version : {software.version}</p>
            <p className="mb-0 fs-13">
              {software.features} 
            </p>
            <div className="g_card_badge text-right">
              {software.new == 1 ? (
                <Badge bg="danger" className="font-weight-bold card_badge">
                  <FiGift /> <span> New</span>
                </Badge>
              ) : software.new == 2 ? (
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
                <span> {software.count}</span>
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
    
      
    </>
  );
}
