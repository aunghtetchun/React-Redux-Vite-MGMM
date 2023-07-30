import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchGames from './SearchGames'

export default function TopNav({position}) {
  const title = useSelector((state) => state.gameReducer.title);
  return (
    <>
    <div className="col-12 py-2 px-0 d-flex flex-wrap pt-3 justify-content-center align-items-center top_nav">
        <div className="col-12 px-0 mb-3 mt-2">
          <SearchGames/>
        </div>
        <Nav
          className="col-12 px-0"
          justify
          variant="tabs"
          defaultActiveKey={position}          
        >
          <Nav.Item>
            <Nav.Link className="px-0 fw-bolder" eventKey="/">
              <Link to="/" className="nav-link px-0 fw-bolder">
                Popular
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="new" className="px-0 fw-bolder" eventKey="/games">
              <Link to="/games" className="nav-link px-0 fw-bolder">
                {title ? title : 'All'}
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="px-0 fw-bolder" eventKey="/category" >
            <Link to="/category" className="nav-link px-0 fw-bolder">
              Category
            </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
    </div>
  </>
  )
}
