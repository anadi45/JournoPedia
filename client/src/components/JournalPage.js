import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/JournalPage.css";
// import img from '../../public/images/'

import { useCookies } from "react-cookie";

function JournalPage(props) {
  const [img, setImg] = useState("");
  const [journalName, setJournalName] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [article, setArticle] = useState("");
  const [articleName, setArticleName] = useState("");
  const [reviewer, setReviewer] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    axios
      .get(`http://localhost:5000/viewJournal/${props.journalId}`)
      .then((res) => {
        console.log(res.data);
        setImg(res.data.journal.image.substr(14));
        setJournalName(res.data.journal.journal_name);
        setSynopsis(res.data.journal.synopsis);
        setAuthor(res.data.author.name);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
        Authorization: "Bearer " + cookies.token,
      },
    };

    await axios
    .post(
      `http://localhost:5000/addArticle`,
      {
        article_name: articleName,
        peer_choice: reviewer,
        article: article,
        journal_id: props.journalId
      },
      config
    )
    .then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div className="journal-page-div">
      <img className="journal-img" src={`/${img}`} alt={journalName} />
      <div className="journal-info-div">
        <h2 className="journal-heading">{journalName}</h2>
        <h5>Editor in Chief</h5>
        <p>{author}</p>
        <h5>Synopsis</h5>
        <p>{synopsis}</p>
      </div>


      <form>
        <h3>Add Article</h3>
        <div className="mb-3">
          <label>Article Name</label>
          <input
            type="text"
            className="form-control"
            // value={journalName}
            name="article_name"
            onChange={(e) => {
              
              setArticleName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
            <label>Reviewer 1</label>
            <input type="text" name="reviewer1" onChange={(e)=>{
              setReviewer([...new Set([...reviewer,e.target.value])]);
            }}/>
            <label>Reviewer 2</label>
            <input type="text" name="reviewer2" onChange={(e)=>{
              // setReviewer([...reviewer,e.target.value])
              setReviewer([...new Set([...reviewer,e.target.value])]);
            }}/>
            <label>Reviewer 3</label>
            <input type="text" name="reviewer3" onChange={(e)=>{
              // setReviewer([...reviewer,e.target.value]);
              setReviewer([...new Set([...reviewer,e.target.value])]);
            }}/>
            <label>Reviewer 4</label>
            <input type="text" name="reviewer4" onChange={(e)=>{
              // setReviewer([...reviewer,e.target.value]);
              setReviewer([...new Set([...reviewer,e.target.value])]);
            }}/>
        </div>

        <div className="mb-3">
          <label>Upload Article</label>
          <input
            type="file"
            name="article"
            onChange={(e) => {
              setArticle(e.target.files[0]);
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
            {/* <span
              style={{ visibility: spinnerVisible }}
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            /> */}
          </button>
        </div>
        {/* <div
          className="journal-message"
          style={{ display: messageDisplay, color: messageColor }}
        >
          {message}
        </div> */}
      </form>
    </div>
  );
}

export default JournalPage;
