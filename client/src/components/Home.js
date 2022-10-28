import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { topics } from "../utils/topics";
import "../css/Home.css";

function Home(props) {
  const [journals, setJournals] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState("visible");

  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    axios.get(`http://localhost:5000/getAllJournals`).then((res) => {
      setSpinnerVisible("hidden");
      setJournals(res.data);
    });
  }, []);

  if (spinnerVisible === "visible") {
    return (
      <span
        style={{ visibility: spinnerVisible }}
        className="spinner-border spinner-border-sm home-spinner"
        role="status"
        aria-hidden="true"
      />
    );
  } else
    return (
      <div className="home-div">
        {/* <div class="container"> */}
        <div className="row">
          {journals.map((item, i) => {
            // console.log(i);
            return (
              <div key={item._id} className="col col-md-3 card-div">
                <Link to={`/journal/${item._id}`} className="card-link">
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={item.image.substr(14)}
                      alt={item.journal_name}
                    />
                    <div className="card-body">
                      <p className="card-title">{item.journal_name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    );
}

export default Home;
