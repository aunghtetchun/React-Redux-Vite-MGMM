import React, { useState, useContext } from "react";
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

  return (
    <div className="col-12 mt-5 card col-md-6 p-0">
      <div className="card-body">
      <h6 className="my-3">LOGIN USER ACCOUNT</h6>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="email">
              Phone:
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
            <label className="form-label" htmlFor="password">
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
            <Link to={'/user/register'} className="btn col-4 me-2 mt-3 btn-outline-success px-4 py-2">
              Register
            </Link>
            <button className="btn col-4 mt-3 btn-primary px-4 py-2" type="submit">
              Login
            </button>
            
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginUser;
