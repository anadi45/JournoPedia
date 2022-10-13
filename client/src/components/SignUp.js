import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmailExists(false);
    setPhoneExists(false);
    await axios
      .post(`http://localhost:5000/signup`, {
        name: name,
        email: email,
        phone: phone,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "User successfully signed up") {
          navigate("/account");
        } else if (res.data.message === "Email already registered") {
          console.log("email already");
          setEmailExists(true);
        } else if (res.data.message === "Phone already registered") {
          setPhoneExists(true);
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <form>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
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
        <label>Phone No</label>
        <input
          type="number"
          className="form-control"
          placeholder="Phone No"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
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
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      <div className="error-message">
        {emailExists
          ? "Email already exists"
          : phoneExists
          ? "Phone No already exists"
          : ""}
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}

export default SignUp;
