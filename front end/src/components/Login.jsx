import React, { useRef } from "react";
import "./login.css";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { useState } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/users/login",
        user
      );
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <ModeOfTravelIcon />
        MT Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User Name" ref={nameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {error && (
          <span className="failure">Sorry! Something went wrong! </span>
        )}
      </form>
      <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
