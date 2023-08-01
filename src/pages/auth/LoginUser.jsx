import React, { useState, useContext } from "react";
import { useRef } from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginUser = () => {
  const { handleLogin, isLoggedIn,errors } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      await handleLogin(email, password);
  };
  if (isLoggedIn) {
    navigate("/profile");
  }
  const touchStartX = useRef(0);
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const deltaX = touchX - touchStartX.current;

    // Determine the threshold for considering it a left slide (you can adjust this value)
    const threshold = 50;

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
     <div className="col-12 mt-5 card col-md-6 p-0">
      <div className="card-body">
      <h4 className="mb-3 mt-1 ">အကောင့်ဝင်မည်</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label mt-2" htmlFor="email">
              ဖုန်းနံပါတ်:
            </label>
            <input
              type="number"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
             {errors.email && <div className="error text-danger mt-1">The phone number error</div>}
          </div>
          <div>
            <label className="form-label mt-2" htmlFor="password">
              Password:
            </label>
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
          <div className="text-end">
            <Link to={'/user/register'} className="btn me-2 mt-3 btn-outline-success px-3 py-2">
              <FiUserPlus/>&nbsp;အကောင့်သစ်
            </Link>
            <button className="btn mt-3 bg_main px-3 py-2" type="submit">
             <FiLogIn/>&nbsp;Login
            </button>
            
          </div>

        </form>
      </div>
    </div>
   </div>
  );
};

export default LoginUser;
