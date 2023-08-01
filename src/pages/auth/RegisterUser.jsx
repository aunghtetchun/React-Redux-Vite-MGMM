// src/components/Register.js
import React, { useContext, useState } from "react";
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
    await handleRegister({ name, email, password, confirm_password });
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="col-12 col-md-6 mt-3 p-0 card">
      <div className="card-header">
        <h6 className="my-3">REGISTER ACCOUNT</h6>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label" htmlFor="name">Name:</label>
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
            <label className="form-label" htmlFor="email">Phone:</label>
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
            <Link to={'/user/login'} className="btn col-4 me-2 mt-3 btn-outline-success px-4 py-2">
              <FiLogIn/>&nbsp;Login
            </Link>
            <button className="btn col-4 mt-3 btn-primary px-4 py-2" type="submit">
             <FiUserPlus/>&nbsp;Register
            </button>
            
          </div>
        </form>
      </div>

    </div>
  );
};
export default RegisterUser;
