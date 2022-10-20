import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/JournalPage.css";
// import img from '../../public/images/'
function JournalPage(props) {
  const [img, setImg] = useState("");
  const [journalName, setJournalName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");

  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    axios
      .get(`http://localhost:5000/viewJournal/${props.journalId}`)
      .then((res) => {
        // console.log(res.data.image.substr(14));
        setImg(res.data.image.substr(14));
        setJournalName(res.data.journal_name);
        setSynopsis(res.data.synopsis);
        setAuthorId(res.data.author);
      });
  }, []);
  return (
    <div className="journal-page-div">
      <img className="journal-img" src={`/${img}`} alt={journalName} />
      <div className="journal-info-div">
        <h2 className="journal-heading">{journalName}</h2>

        <h5>Synopsis</h5>
        <p>{synopsis}</p>
      </div>
    </div>
  );
}

export default JournalPage;
