import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";


function Register() {
  let navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");


  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
        "email": email,
        "first_name": fname,
        "last_name": lname,
        "password": password
      }
    axios.post("https://python-demo-weavers.herokuapp.com/api/register/",data).then((res)=> {
      if(res.status === 201){
        Swal.fire({
            icon: 'success',
            title: 'Registation Successfull',
            html:"You Will Be Redirected To Login Page",
            showConfirmButton: false,
            timer: 2000
          }).then(()=>{
              navigate("../login", { replace: true });
          })
      }
    }).catch((err)=> {
        console.log(err)
    })
  }

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
            onSubmit={handelSubmit}
          >
            <center>
              <h3>Register</h3>
            </center>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name
              </label>
              <input type="text" className="form-control" onChange={e => setFname(e.target.value)} value={fname}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name
              </label>
              <input type="text" className="form-control" onChange={e => setLname(e.target.value)} value={lname}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password}/>
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Register
            </button>
            <div className="mt-3">
              <center>
                <span>
                  <Link className="nav-link" to={"/login"}>
                    Already Have An Account? Login
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

export default Register;
