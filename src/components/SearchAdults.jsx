import React, { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { fetchAdultsSearch, setAllAdults } from '../actions/adultAction';

export default function SearchAdults() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Submitting search with:', searchValue);
    if (searchValue=='') {
        dispatch(setAllAdults([]));
    }
    dispatch(fetchAdultsSearch(searchValue));
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  

  return (
    <Form className='my-3' onSubmit={handleSubmit}>
      <Row>
        <Col xs="10" className="pe-0">
          <Form.Control
            type="text"
            placeholder="Search adults..."
            className="pe-0 search_input"
            value={searchValue}
            onChange={handleChange}
          />
        </Col>
        <Col xs="2" className="ps-0">
          <Button className="w-100 search_btn" type="submit">
            <FiSearch />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
