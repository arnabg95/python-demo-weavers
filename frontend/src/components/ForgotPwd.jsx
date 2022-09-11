import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function ForgotPwd() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [otp, setOTP] = useState("");
  const [otpPossible, setOTPPossible] = useState(false);
  const [pwdPossible, setPwdPossible] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("../dashboard", { replace: true });
    }
  }, [user]);


  const handelChange = () => {
    const data = {
        password: password
      };
      axios
        .patch("https://python-demo-weavers.herokuapp.com/api/update/", data,{headers:{authorization:`Token ${access}`}})
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Swal.fire("Password Updated");
            setPwdPossible(false)
            setOTPPossible(false)
            setEmail("")
            setPassword("")
            setAccess("")
            setOTP("")
            navigate("../login",{replace:true})
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const handelSubmitOtp = () => {
    const data = {
      email: email,
      otp: otp,
    };
    axios
      .post("https://python-demo-weavers.herokuapp.com/api/reset-otp/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire("Verification Successfull");
          setPwdPossible(true)
          setAccess(res.data.access)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelSubmit = () => {
    const data = {
      email: email,
    };
    axios
      .post("https://python-demo-weavers.herokuapp.com/api/reset-email/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire("OTP Sent To Email");
          setOTPPossible(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
            {pwdPossible?           <form
          style={{
              width: "500px",
              padding: "20px",
              border: "2px solid black",
              borderRadius: "15px",
            }}
            onSubmit={(e) => e.preventDefault()}
            >
            <center>
              <h3>Change Password</h3>
            </center>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Password
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
                onClick={handelChange}
                >
                Change
              </button>
            <div className="mt-3">
              <center>
                <span>
                  <Link className="nav-link" to={"/login"}>
                    Remember Password? Login
                  </Link>
                </span>
              </center>
            </div>
          </form>:
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
              <h3>Recover Password</h3>
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
            <div className={otpPossible ? "mb-3" : "mb-3 hidden"}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                OTP
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setOTP(e.target.value)}
                value={otp}
                />
            </div>
            {otpPossible ? (
                <button
                type="button"
                className="btn btn-dark w-100"
                onClick={handelSubmitOtp}
                >
                Verify
              </button>
            ) : (
                <button
                type="button"
                className="btn btn-dark w-100"
                onClick={handelSubmit}
                >
                Submit
              </button>
            )}

            <div className="mt-3">
              <center>
                <span>
                  <Link className="nav-link" to={"/login"}>
                    Remember Password? Login
                  </Link>
                </span>
              </center>
            </div>
          </form>
}
        </div>
      </div>
    </div>
  );
}

export default ForgotPwd;
