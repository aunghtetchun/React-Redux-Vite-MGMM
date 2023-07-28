import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

export default function LoadingCard() {
    const count= 8;
    const helloElements = [];
  for (let i = 0; i < count; i++) {
    helloElements.push(
        <div className="col-12 col-md-6 col-lg-4">
                <Card className="m-1 shadow">
                    <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
                        <Placeholder className="col-3 mb-0 pe-2" as={Card.Text} animation="glow">
                            <Placeholder xs={11} className="img_holder w-100" /> 
                        </Placeholder>
                        <Placeholder className="col-9" as={Card.Text} animation="glow">
                            <Placeholder xs={10} /> 
                            <Placeholder xs={5} />{' '}<Placeholder xs={4} />
                            <Placeholder xs={4} /> 
                        </Placeholder>
                    </Card.Body>
                </Card>
        </div>
    );
  }
  return (
    <>
        <div className="col-12 px-0 px-md-2 d-flex flex-wrap justify-content-center align-items-center">
            {helloElements}
        </div>
    </>
  )
}
