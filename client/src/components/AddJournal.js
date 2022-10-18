import React, { useEffect, useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "../css/AddJournal.css";
import axios from "axios";
import { useCookies } from "react-cookie";

function AddJournal(props) {
  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
  }, []);

  const [journalName, setJournalName] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState("");
  const [messageDisplay, setMessageDisplay] = useState("none");
  const [messageColor, setMessageColor] = useState("");
  const [spinnerVisible, setSpinnerVisible] = useState("hidden");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleOnchange = (topics) => {
    let str = "";
    let topicsArr = [];
    for (let c of topics) {
      if (c === ",") {
        topicsArr.push(str);
        str = "";
      } else {
        str += c;
      }
    }
    topicsArr.push(str);
    setTopics(topicsArr);
    console.log(topicsArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinnerVisible("visible");
    const config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
        Authorization: "Bearer " + cookies.token,
      },
    };
    await axios
      .post(
        `http://localhost:5000/createJournal`,
        {
          journal_name: journalName,
          synopsis: synopsis,
          topics_covered: topics,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        setSpinnerVisible("hidden");
        setMessage(res.data.message);
        setMessageDisplay("inline");
        if (res.data.message === "Journal created successfully")
          setMessageColor("green");
        else setMessageColor("red");
      });
  };

  const options = [
    { label: "Machine Learning", value: "ML" },
    { label: "Data Mining", value: "DMCT" },
    { label: "Computer Networks", value: "CN" },
    { label: "Image Processing", value: "IP" },
  ];

  return (
    <form>
      <h3>Publish</h3>
      <div className="mb-3">
        <label>Journal Name</label>
        <input
          type="text"
          className="form-control"
          value={journalName}
          onChange={(e) => {
            setMessageDisplay("none");
            setJournalName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Topics Covered</label>
        {/* <div  className="preview-values">
        <h4>Values</h4>
        {topics}
      </div> */}

        <MultiSelect
          width={"100%"}
          onChange={handleOnchange}
          options={options}
        />
      </div>

      <div className="mb-3">
        <label>Synopsis</label>
        <textarea
          type="text"
          className="form-control"
          value={synopsis}
          onChange={(e) => {
            setMessageDisplay("none");
            setSynopsis(e.target.value);
          }}
        />
      </div>

      <div className="d-grid">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
          <span
            style={{ visibility: spinnerVisible }}
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        className="journal-message"
        style={{ display: messageDisplay, color: messageColor }}
      >
        {message}
      </div>
    </form>
  );
}

export default AddJournal;
