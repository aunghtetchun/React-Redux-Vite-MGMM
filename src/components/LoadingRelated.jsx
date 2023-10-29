import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const LoadingRelated = ({ count }) => {
  const generateLoadingCards = () => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="col-3 px-0 related_game_card game_card px-1 rounded-0">
        <Card className=" shadow">
          <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
              <Placeholder as={Card.Text} animation="glow" className=" my-1 w-100 h-100 ">
                <Placeholder xs={11} className="img_holder w-100 h-100 rounded" />
              </Placeholder>
              <Placeholder xs={11} className="my-1 w-100" />
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <div className="col-12 mx-auto px-0 mt-3 col-md-12 col-lg-9 shadow d-flex flex-wrap justify-content-center align-items-center">
      {generateLoadingCards()}
    </div>
  );
};

export default LoadingRelated;
