import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import {  FiLogOut } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";
import { AuthContext } from "../contexts/AuthContext";
import LoginUser from "./auth/LoginUser";

export default function Profile() {
  const { user, isLoggedIn,games, handleLogout } = useContext(AuthContext);
 
  const touchStartX = useRef(0);
  const navigate=useNavigate();
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 66;

    if (deltaX > threshold) {
      console.log("Sliding left");
      navigate('/request')
    } 
  };
  return (
    <div 
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    className="col-12 px-0 min_height">    
      {!isLoggedIn ? (
        <LoginUser />
      ) : (
        <div className="col-12  ">
          <div className="d-flex shadow mt-3 border rounded py-3 flex-wrap justify-content-between align-items center">
            <div className="col-3 p-2">
              <Card.Img
                variant="top"
                src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg"
              />
            </div>
            <div className="col-9 p-2">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text> Ph - {user.phone}</Card.Text>
                <Button
                  variant="danger"
                  className="w-100 py-2"
                  onClick={() => handleLogout()}
                >
                  <FiLogOut/>&nbsp;Logout
                </Button>
              </Card.Body>
            </div>
          </div>
          <div className="card col-12 mt-4">
            <div className="card-title mb-0 text-center">
                <h3 className="fw-bolder pt-3">သင်သိမ်းထားသောဂိမ်းများ</h3>
                <hr/>
            </div>
            <div className="card-body px-2 pt-0 save_games">
            {games && games.length>0 ? games.map((game) => (
              <div
                className="col-12 mb-3 pt-2"
                key={game.id}
              >
                <CardItem user_id={user.id} game={game} />
              </div>
            )):
              <h5 className="m-2" style={{lineHeight:1.7 }}>သိမ်းထားသောဂိမ်းများ မရှိသေးပါ... မိမိ သိမ်းထားလိုသောဂိမ်းအား နောင်တစ်ချိန်အလွယ်တကူဒေါင်းနိုင်ရန် ဂိမ်းစာမျက်နှာမှ <span className="text-danger">Download Game</span>  ဘေးဘက်ရှိ <span className="text-danger">သိမ်းထားမည် </span> ခလုပ်အားအသုံးပြု၍ သိမ်းထားနိုင်ပါတယ်...</h5>
            }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
