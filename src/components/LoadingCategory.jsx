import React from 'react';
import { Placeholder } from 'react-bootstrap';

export default function LoadingCategory() {
  const count = 22;
  const helloElements = [];
  for (let i = 0; i < count; i++) {
    helloElements.push(
      <div key={i} className="col-6 p-1">
        <Placeholder.Button variant='danger' className="rounded-0 w-100 p-2"/>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex mt-2 col-12 flex-wrap px-0 justify-content-center">
        {helloElements}
      </div>
    </>
  );
}
