import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  let { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/login"}>
          Python REST Demo {user ? user : ""}
        </Link>
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
          {user ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
