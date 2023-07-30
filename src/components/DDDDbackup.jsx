import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import AllGames from "./AllGames";
import { Category } from "./Category";
import PopularGames from "./PopularGames";
import Search from "./Search";

export default function TasdopNav() {
  const [activeTab, setActiveTab] = useState("/");
  const [category, setCategory] = useState(100);
  const title = useSelector((state) => state.gameReducer.title);

  const handleNavItemClick = (eventKey) => {
    if (eventKey != '/games'){
        setCategory(100);
    }
    setActiveTab(eventKey);
  };
  
  const handleCategoryClick = (id) => {
    setCategory(id);
    if(id>0) {
        document.getElementById('new').click();
        setActiveTab('/games');
    }
  }
  const renderComponent = () => {
    switch (activeTab) {
      case "/":
        return <PopularGames />;
      case "/games":
        if(category <= 100){
            return <AllGames category_id={category}/>;
        }else{
            return <AllGames category_id={100}/>;
        }
      case "/category":
        return <Category handleCategoryClick={handleCategoryClick}/>;
      default:
        return null;
    }
  };

  return (
    <>
    <div className="col-12 py-2 px-0 d-flex flex-wrap pt-3 justify-content-center align-items-center top_nav">
        <div className="col-12 px-0 mb-3 mt-2">
          <Search/>
        </div>
        <Nav
          className="col-12 px-0"
          justify
          variant="tabs"
          defaultActiveKey="/"
          onSelect={handleNavItemClick}
        >
          <Nav.Item>
            <Nav.Link className="px-0 fw-bolder" eventKey="/">Popular</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id="new" className="px-0 fw-bolder" eventKey="/games">{title ? title :'All'}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="px-0 fw-bolder" eventKey="/category" >Category</Nav.Link>
          </Nav.Item>
        </Nav>
    </div>
    <div className="col-12 px-0 min_height">
    {renderComponent()}
  </div>
  </>
  );
}
