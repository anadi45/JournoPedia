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
import Status from "./components/Status";
import ReviewPage from "./components/ReviewPage";

function App() {
	const [cookies, setCookie] = useCookies(["token"]);
	const [journalIds, setJournalIds] = useState([]);
	const [displayItems, setDisplayItems] = useState([
		"inline",
		"inline",
		"none",
	]);
	const [username, setUsername] = useState("");
	const [userRole, setUserRole] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// const navigate = useNavigate();

	useEffect(() => {
		if (cookies.token) setIsLoggedIn(true);

		axios.get(`http://localhost:5000/getAllJournalIds`).then((res) => {
			// console.log(res.data);
			setJournalIds(res.data);
		});

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
		axios.get(`http://localhost:5000/userDetailsToken`, config).then((res) => {
			setUserRole(res.data.userRole);
			setUsername(res.data.name);
		});
	}, []);

	return (
		<Router>
			<div className="App">
				<nav className="navbar navbar-expand-lg navbar-light fixed-top">
					<div className="container">
						<Link className="navbar-brand" to={"/"}>
							<span class="brand-color">JournoPedia</span>
						</Link>
						<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
							<ul className="navbar-nav ml-auto">
								<li
									className="nav-item login-link"
									style={{ display: displayItems[0] }}
								>
									<Link className="nav-link" to={"/sign-in"}>
										<span class="login-color">Login</span>
									</Link>
								</li>
								<li
									className="nav-item sign-up-link"
									style={{ display: displayItems[1] }}
								>
									<Link className="nav-link" to={"/sign-up"}>
										<span class="sign-up-color">Sign up</span>
									</Link>
								</li>
								<li
									className="nav-item logout-link"
									style={{
										display: displayItems[2],
										visibility: isLoggedIn ? "visible" : "hidden",
									}}
								>
									<Dropdown className="">
										<Dropdown.Toggle
											className="dropdown-btn"
											variant=""
											id="dropdown-basic"
										>
											<i class="far fa-user" /> {username}
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item>
												<Link className="nav-link" to="/profile">
													Profile
												</Link>
											</Dropdown.Item>
											{userRole === "Admin" && (
												<Dropdown.Item>
													<Link className="nav-link" to={"/publish-journal"}>
														Publish Journal
													</Link>
												</Dropdown.Item>
											)}
											<Dropdown.Item>
												<Link className="nav-link" to="/review-article">
													Review Article
												</Link>
											</Dropdown.Item>
											<Dropdown.Item>
												<Link className="nav-link" to="/status">
													Submission Status
												</Link>
											</Dropdown.Item>
											<Dropdown.Item>
												<Link className="nav-link" to="/logout">
													<span>Log out</span>
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
							element={<Home setDisplayItems={setDisplayItems} />}
						/>
						<Route path="/sign-in" element={<Login />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route
							path="/home"
							element={<Home setDisplayItems={setDisplayItems} />}
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

						<Route path="/review-article" element={<ReviewPage />} />

						<Route path="/status" element={<Status />} />
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
										<JournalPage
											setDisplayItems={setDisplayItems}
											journalId={item}
										/>
									}
								/>
							);
						})}
					</Routes>
				</div>
			</div>
		</Router>
	);
}
export default App;
