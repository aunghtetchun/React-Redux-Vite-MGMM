import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginUser = () => {
  const { handleLogin, isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="col-12 mt-5 card col-md-6 p-0">
      <div className="card-body">
      <h6 className="my-3">LOGIN USER ACCOUNT</h6>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
          </div>
          <div className="text-end">
            <button className="btn col-4 me-2 mt-3 btn-outline-success px-4 py-2">
              Register
            </button>
            <button className="btn col-4 mt-3 btn-primary px-4 py-2" type="submit">
              Login
            </button>
            
          </div>

        </form>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginUser;
