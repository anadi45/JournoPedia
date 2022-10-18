import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JournalPage from "./JournalPage";

function Account(props) {
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
      <div>
        <h3>List of journals</h3>

        {journals.map((item) => {
          return (
            <div key={item._id}>
              <Link
                onClick={() => {
                  props.setJournalId(item._id);
                }}
                to={`/journal/${item._id}`}
              >
                {item.journal_name}
              </Link>
            </div>
          );
        })}
      </div>
      //   </Router>
    );
}

export default Account;
