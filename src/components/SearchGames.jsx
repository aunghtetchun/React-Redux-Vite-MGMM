import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllGames, fetchGamesSearch } from '../actions/gameActions';

export default function SearchGames() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const isGames = location.pathname.includes('/games');
  const search_keyword = useSelector((state) => state.gameReducer.search_keyword);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Submitting search with:', searchValue);
    if (searchValue=='') {
      dispatch(fetchAllGames());
    }
    dispatch(fetchGamesSearch(searchValue));
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(()=>{
    if(!isGames && search_keyword!=null){
      navigate(`/games/`);
    }
  },[isGames,navigate,search_keyword])
  

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="10" className="pe-0">
          <Form.Control
            type="text"
            placeholder="Search data..."
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
