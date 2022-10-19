import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JournalPage from "./JournalPage";
import { topics } from "../utils/topics";
import "../css/Home.css";
import img1 from "../images/home-img-1.jpg";
import img2 from "../images/home-img-2.jpg";
import img3 from "../images/home-img-3.jpg";
import img4 from "../images/home-img-4.jpg";
import img5 from "../images/home-img-5.jpg";
import img6 from "../images/home-img-6.jpg";
import img7 from "../images/home-img-7.jpg";
import img8 from "../images/home-img-8.jpg";
import img9 from "../images/home-img-9.jpg";
import img10 from "../images/home-img-10.jpg";
import img11 from "../images/home-img-11.jpg";
import img12 from "../images/home-img-12.jpg";

function Home(props) {
  const [journals, setJournals] = useState([]);
  const [spinnerVisible, setSpinnerVisible] = useState("visible");

  useEffect(() => {
    // setTimeout(() => {}, 20000);
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    // axios.get(`http://localhost:5000/getAllJournals`).then((res) => {
    //   setSpinnerVisible("hidden");
    //   console.log(res.data);
    //   setJournals(res.data);
    // });
  }, []);

  // if (spinnerVisible === "visible") {
  //   return (
  //     <span
  //       style={{ visibility: spinnerVisible }}
  //       className="spinner-border spinner-border-sm"
  //       role="status"
  //       aria-hidden="true"
  //     />
  //   );
  // } else
  return (
    //   <Router>
    <div className="home-div">
      {/* <div class="container"> */}
      <div className="row">
        {topics.map((item) => {
          return (
            <div key={item} className="col col-md-3 card-div">
              <Link to={`/${item}`}>
                <div className="card">
                  <img className="card-img-top" src={img2} alt={item} />
                  <div className="card-body">
                    <p className="card-title">{item}</p>
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
