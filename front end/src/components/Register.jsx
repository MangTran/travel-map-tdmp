import React, { useRef } from "react";
import "./register.css";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { useState } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

const Register = ({ setShowRegister }) => {
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:8800/api/users/register", newUser);
      setError(false);
      setSucces(true);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <ModeOfTravelIcon />
        MT Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User Name" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="registerBtn">Register</button>
        {succes && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && (
          <span className="failure">Sorry! Something went wrong! </span>
        )}
      </form>
      <CancelIcon
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
