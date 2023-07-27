// src/components/Register.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterUser = () => {
  const { handleRegister,isLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ name, email, password });
    } catch (error) {
      setError(error.message);
    }
  };
  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="col-12 col-md-6 p-0 card">
      <div className="card-header">
        <h5 className="my-3">REGISTER ACCOUNT</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button className="mt-3 btn btn-primary px-4 py-2" type="submit">Register</button>
        </form>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};
export default RegisterUser;
