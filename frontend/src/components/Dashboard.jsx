import React, { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const navigate = useNavigate();
  const { user,access } = useContext(AuthContext);


  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [lastname,setLastname] = useState('')

  useEffect(() => {
    if (!user) {
      navigate("../login", { replace: true });
    }
  }, [user,navigate]);

  useEffect(() => {
    axios
      .get("https://python-demo-weavers.herokuapp.com/api/update/",{headers:{authorization:`Token ${access}`}})
      .then((res) => {
        setUsername(res.data.first_name)
        setEmail(res.data.email)
        setLastname(res.data.lastname)
      })
      .catch((err) => {
        console.log(err);
      });
  },[access]);

  return <div className="container">
    <center><h3>Dashboard</h3></center><br />
    <p>
        {username} {lastname}
    </p>
    <p>
        {email}
    </p>
  </div>;
}

export default Dashboard;
