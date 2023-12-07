// src/components/Register.js
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterUser = () => {
  const { handleRegister, isLoggedIn, errors } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response=await handleRegister({ name, email, password, confirm_password });
    if(response.token){
      navigate("/profile");
    }
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const touchStartX = useRef(0);
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 150;

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

    <div className="col-12 box2 col-md-6 mt-3 p-0 card">
      
      <div className="card-body">
        <h4 className="mb-3 mt-1 ">အကောင့်သစ်ဖွင့်မည်</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label " htmlFor="name">နာမည်:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
             {errors.name && <div className="error text-danger mt-1">{errors.name[0]}</div>}
          </div>
          <div className="mb-2">
            <label className="form-label " htmlFor="email">ဖုန်းနံပါတ်:</label>
            <input
              type="number"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
             {errors.email && <div className="error text-danger mt-1">The phone number has already taken</div>}
  
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
             {errors.password && <div className="error text-danger mt-1">{errors.password[0]}</div>}
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="confirm_password">Confrim Password:</label>
            <input
              type="confirm_password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
             {errors.confirm_password && <div className="error text-danger mt-1">{errors.confirm_password[0]}</div>}
          </div>
          <div className="text-end">
            <Link to={'/user/login'} className="btn me-2 mt-3 btn-outline-success px-3 py-2">
              <FiLogIn/>&nbsp;Login
            </Link>
            <button className="btn mt-3 bg_main px-3 py-2" type="submit">
             <FiUserPlus/>&nbsp;Register
            </button>
            
          </div>
        </form>
      </div>

    </div>
    </div>

  );
};
export default RegisterUser;
