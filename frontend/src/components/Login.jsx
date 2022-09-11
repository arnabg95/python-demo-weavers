import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("../dashboard", { replace: true });
    }
  }, [user]);

  const handelSubmit = () => {
    login(email, password);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          <form
            style={{
              width: "500px",
              padding: "20px",
              border: "2px solid black",
              borderRadius: "15px",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <center>
              <h3>Login</h3>
            </center>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={handelSubmit}
            >
              Login
            </button>
            <div className="mt-3">
              <center>
                <span>
                  <Link className="nav-link" to={"/register"}>
                    Dont Have Account? Register
                  </Link>
                </span>
              </center>
              <center>
                <span>
                  <Link className="nav-link" to={"/forget-password"}>
                    Forgot Password?
                  </Link>
                </span>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
