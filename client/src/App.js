import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useCookies } from "react-cookie";
import Logout from "./components/Logout";
import AddJournal from "./components/AddJournal";
import JournalPage from "./components/JournalPage";
import { topics } from "../src/utils/topics";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Profile from "./components/Profile";

function App() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [journalIds, setJournalIds] = useState([]);
  const [displayItems, setDisplayItems] = useState([
    "inline",
    "inline",
    "none",
    "none",
    "none",
  ]);
  // const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/getAllJournalIds`).then((res) => {
      console.log(res.data);
      setJournalIds(res.data);
    });
  }, []);

  const handleSelect = (e) => {
    console.log(e.target.value);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              JournoPedia
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item login-link"
                  style={{ display: displayItems[0] }}
                >
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
                <li
                  className="nav-item home-link"
                  style={{ display: displayItems[2] }}
                >
                  <Link className="nav-link" to={"/home"}>
                    Home
                  </Link>
                </li>
                <li
                  className="nav-item publish-link"
                  style={{ display: displayItems[3] }}
                >
                  <Link className="nav-link" to={"/publish-journal"}>
                    Publish Journal
                  </Link>
                </li>

                {/* <li
                  className="nav-item logout-link"
                  style={{ display: displayItems[4] }}
                >
                  <ul class="dropdown">
                    <li className="dropdown-options">
                      <a href="/">Sub-1</a>
                    </li>
                    <li className="dropdown-options">
                      <a href="/">Sub-2</a>
                    </li>
                    <li className="dropdown-options">
                      <a href="/">Sub-3</a>
                    </li>
                  </ul>
                </li> */}
                <li
                  className="nav-item logout-link"
                  style={{ display: displayItems[4] }}
                >
                  <Dropdown className="">
                    <Dropdown.Toggle
                      className="dropdown-btn"
                      variant=""
                      id="dropdown-basic"
                    >
                      <i class="far fa-user" /> username
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link className="nav-link" to="/profile">
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="nav-link" to="/logout">
                          Log out
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <Routes>
            <Route
              exact
              path="/"
              element={
                cookies.token ? (
                  <Home setDisplayItems={setDisplayItems} />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/home"
              element={
                cookies.token ? (
                  <Home setDisplayItems={setDisplayItems} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/publish-journal"
              element={
                cookies.token ? (
                  <AddJournal setDisplayItems={setDisplayItems} />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              path="/profile"
              element={<Profile setDisplayItems={setDisplayItems} />}
            />
            <Route
              path="/logout"
              element={<Logout setDisplayItems={setDisplayItems} />}
            />

            {journalIds.map((item) => {
              return (
                <Route
                  key={item}
                  path={`/journal/${item}`}
                  element={
                    cookies.token ? (
                      <JournalPage
                        setDisplayItems={setDisplayItems}
                        journalId={item}
                      />
                    ) : (
                      <Login />
                    )
                  }
                />
              );
            })}

            {/* {topics.map((item) => {
              return (
                <Route
                  key={item}
                  path={`/${item}`}
                  element={<JournalPage setDisplayItems={setDisplayItems} />}
                />
              );
            })} */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
