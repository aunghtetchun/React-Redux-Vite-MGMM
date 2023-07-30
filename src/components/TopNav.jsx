import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import SearchGames from './SearchGames'

export default function TopNav({ position }) {
  const title = useSelector((state) => state.gameReducer.title);
  const navigate= useNavigate();

  const handleClick =  (url) => {
    navigate(url)
  }
  return (
    <>
      <div className="col-12 py-2 px-0 d-flex flex-wrap pt-3 justify-content-center align-items-center top_nav">
        <div className="col-12 px-0 mb-3 mt-2">
          <SearchGames />
        </div>
        <Nav
          className="col-12 px-0"
          justify
          variant="tabs"
          defaultActiveKey={position}
        >
          <Nav.Item>
            <Nav.Link onClick={()=>handleClick('/')} className="px-0 fw-bolder" eventKey="/">
              Popular
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="new" onClick={()=>handleClick('/games')} className="px-0 fw-bolder" eventKey="/games">
              {title ? title : 'All'}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>handleClick('/category')} className="px-0 fw-bolder" eventKey="/category">
              Category
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </>
  )
}
