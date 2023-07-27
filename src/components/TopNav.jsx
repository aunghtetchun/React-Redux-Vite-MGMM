import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import AllGames from "./AllGames";
import { Category } from "./Category";
import PopularGames from "./PopularGames";

export default function TopNav() {
  const [activeTab, setActiveTab] = useState("/");
  const [category, setCategory] = useState(100);

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
    <div className="col-12 py-2 d-flex flex-wrap justify-content-center align-items-center top_nav">
      <Nav
        className="col-12 px-0"
        justify
        variant="tabs"
        defaultActiveKey="/"
        onSelect={handleNavItemClick}
      >
        <Nav.Item>
          <Nav.Link eventKey="/">Popular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="new" eventKey="/games">New</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/category" >Category</Nav.Link>
        </Nav.Item>
      </Nav>
      
    </div>
    <div className="col-12 mt-4 pt-3 px-0 min_height">
    {renderComponent()}
  </div>
  </>
  );
}
