import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JournalPage from "./JournalPage";
// import { topics } from "../utils/topics";
import "../css/Home.css";

function Home(props) {
  const [journals, setJournals] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState("visible");

  useEffect(() => {
    // setTimeout(() => {}, 20000);
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    axios.get(`http://localhost:5000/getAllJournals`).then((res) => {
      setSpinnerVisible("hidden");
      console.log(res.data);
      setJournals(res.data);
    });
  }, []);

  if (spinnerVisible === "visible") {
    return (
      <span
        style={{ visibility: spinnerVisible }}
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    );
  } else
    return (
      //   <Router>
      <div className="home-div">
        {/* <div class="container"> */}
        <div className="row">
          {journals.map((item) => {
            return (
              <div key={item._id} className="col col-md-3 card-div">
                <Link to={`/${item._id}`} className="card-link">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={item.image.substr(14)}
                      alt={item.journal_name}
                    />
                    <div className="card-body">
                      <p className="card-title">{item.journal_name}</p>
                      {/* <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p> */}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      </div>
      //   </Router>
    );
}

export default Home;
