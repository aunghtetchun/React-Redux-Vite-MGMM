import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

export default function ImageCarousel({images}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <>
     
        <Carousel data-bs-theme="dark">
        {images.map((imageUrl, index) => (
          <Carousel.Item key={index}>
             {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
            <img
              className="d-block w-100"
              src={imageUrl}
              alt="First slide"
              onLoad={handleImageLoad}
            />
          </Carousel.Item>
        ))
    }
    </Carousel>

    </>
  )
}
