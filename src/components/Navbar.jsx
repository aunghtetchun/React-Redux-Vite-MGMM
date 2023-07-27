import { React } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Dropdown } from "react-bootstrap";
import { FiUserCheck } from "react-icons/fi";

export default function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <div className="col-12 col-md-11  d-none d-md-block">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand h1 my-0" href="#">
            LOGOTEXT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Button variant="primary" >
                  Games
                </Button>

              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Request
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  Our Team
                </Link>
              </li>
            </ul>
            {!isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/user/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}

            {isLoggedIn && (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    <FiUserCheck className="h2 fw-normal" /> &nbsp;
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-2">
                      <button
                        className="btn btn-danger w-100 py-2"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
