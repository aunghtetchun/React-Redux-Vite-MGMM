import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const LoadingCard = ({ count }) => {
  const generateLoadingCards = () => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="col-12 col-md-6 col-lg-4">
        <Card className="m-1 shadow">
          <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
            <div className="col-3 mb-0 pe-3">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={11} className="img_holder w-100 rounded" />
              </Placeholder>
            </div>
            <div className="col-9">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={10} />
                <Placeholder xs={5} />{' '}
                <Placeholder xs={4} />
                <Placeholder xs={4} />
              </Placeholder>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  };

  return (
    <div className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
      {generateLoadingCards()}
    </div>
  );
};

export default LoadingCard;
