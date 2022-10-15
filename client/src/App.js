import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import { useCookies } from "react-cookie";
import Logout from "./components/Logout";

function App() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [displayItems, setDisplayItems] = useState([
    "inline",
    "inline",
    "none",
  ]);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              JournoPedia
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item" style={{ display: displayItems[0] }}>
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li
                  className="nav-item sign-up-link"
                  style={{ display: displayItems[1] }}
                >
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/account"} />
                </li>
                <li
                  className="nav-item logout-link"
                  style={{ display: displayItems[2] }}
                >
                  <Link className="nav-link" to={"/logout"}>
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  cookies.token ? (
                    <Account setDisplayItems={setDisplayItems} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/account"
                element={
                  cookies.token ? (
                    <Account setDisplayItems={setDisplayItems} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/logout"
                element={<Logout setDisplayItems={setDisplayItems} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
