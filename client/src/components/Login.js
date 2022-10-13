import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageDisplay, setErrorMessageDisplay] = useState("none");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await axios
      .post(`http://localhost:5000/login`, {
        loginCred: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          setErrorMessageDisplay("none");
          navigate("/account");
        } else if (res.data.message) {
          setErrorMessageDisplay("block");
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <form>
      <h3>Log In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </div>
      <div className="error-message" style={{ display: errorMessageDisplay }}>
        Invalid Login Credentials
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
}
export default Login;
