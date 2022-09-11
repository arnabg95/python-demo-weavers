import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null);
  let [user, setUser] = useState( () => localStorage.getItem('authToken')?jwt_decode(JSON.parse(localStorage.getItem('authToken')).access):null);  
  let [loading,setLoading] = useState(true)

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.clear();
  }
  useEffect(() => {
      setLoading(false)
      let times = 1000 * 60 * 14
      let interVal = setInterval(()=>{
          if(authToken){
              updateToken();
            }
        },times)
        return () => clearInterval(interVal)
        // eslint-disable-next-line
    },[authToken,loading])

  const updateToken = async () => {
    const data = {
        'refresh':authToken.refresh
    }
    axios
      .post("http://127.0.0.1:8000/api/refresh/", data)
      .then((res) => {
        if (res.status === 200) {
          setAuthToken(res.data);
          setUser(jwt_decode(res.data.access))
          localStorage.setItem("authToken", JSON.stringify(res.data));
        }else{
            logout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const login = (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((res) => {
        if (res.status === 200) {
          setAuthToken(res.data);
          setUser(jwt_decode(res.data.access))
          localStorage.setItem("authToken", JSON.stringify(res.data));
          Swal.fire("Login Success")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let contectData = {
    login: login,
    logout:logout,
    user:user?.user_id,
    access:authToken?.access
  };

  return (
    <AuthContext.Provider value={contectData}>{children}</AuthContext.Provider>
  );
};
