import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/JournalPage.css";
// import img from '../../public/images/'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function JournalPage(props) {
  const [img, setImg] = useState("");
  const [journalName, setJournalName] = useState("");
  const [author, setAuthor] = useState("");
  const [otherAuthor, setOtherAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [article, setArticle] = useState("");
  const [articleName, setArticleName] = useState("");
  const [reviewer, setReviewer] = useState([]);
  const [abstract, setAbstract] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  let navigate = useNavigate();

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
  const [inputValues, setInputValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
        Authorization: "Bearer " + cookies.token,
      },
    };

    let authorList = Object.values(inputValues);

    await axios
      .post(
        `http://localhost:5000/addArticle`,
        {
          article_name: articleName,
          peer_choice: reviewer,
          article: article,
          abstract: abstract,
          journal_id: props.journalId,
          authors: authorList,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message == "Article added successfully!") {
          navigate("/");
        }
      });
  };

  const [counter, setCounter] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };

  return (
    <div className="journal-page-div">
      <div>
        <img className="journal-img" src={`/${img}`} alt={journalName} />
        <div className="journal-info-div">
          <h2 className="journal-heading">{journalName}</h2>
          <h5>Editor in Chief</h5>
          <p>{author}</p>
          <h5>Synopsis</h5>
          <p>{synopsis}</p>
        </div>
      </div>
      <div className="auth-inner">
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

          {/* <div className="mb-3">
            <label>Add Author</label>
            <input
              type="text"
              className="form-control"
              value={journalName}
              name="otherAuthor"
              onChange={(e) => {
                
                setOtherAuthor();
              }}
            />
          </div> */}

          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleClick}>
              Add More Authors
            </button>

            {Array.from(Array(counter)).map((c, index) => {
              return (
                <input
                  onChange={handleOnChange}
                  key={c}
                  type="text"
                  className={`form-control my-3 ${index}`}
                  placeholder={`Author ${index + 1}`}
                ></input>
              );
            })}
          </div>

          <div className="mb-3">
            <label>Reviewer 1</label>
            <input
              type="text"
              name="reviewer1"
              className="form-control"
              autoComplete="off"
              onChange={(e) => {
                setReviewer([...new Set([...reviewer, e.target.value])]);
              }}
            />
            <label>Reviewer 2</label>
            <input
              type="text"
              name="reviewer2"
              className="form-control"
              autoComplete="off"
              onChange={(e) => {
                // setReviewer([...reviewer,e.target.value])
                setReviewer([...new Set([...reviewer, e.target.value])]);
              }}
            />
            <label>Reviewer 3</label>
            <input
              type="text"
              name="reviewer3"
              className="form-control"
              autoComplete="off"
              onChange={(e) => {
                // setReviewer([...reviewer,e.target.value]);
                setReviewer([...new Set([...reviewer, e.target.value])]);
              }}
            />
            <label>Reviewer 4</label>
            <input
              type="text"
              name="reviewer4"
              className="form-control"
              autoComplete="off"
              onChange={(e) => {
                // setReviewer([...reviewer,e.target.value]);
                setReviewer([...new Set([...reviewer, e.target.value])]);
              }}
            />
          </div>

          <div className="mb-3">
            <label>Abstract</label>
            <textarea
              type="text"
              className="form-control"
              value={abstract}
              name="abstract"
              onChange={(e) => {
                // setMessageDisplay("none");
                setAbstract(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label>Upload Article</label>
            <input
              type="file"
              name="article"
              className="form-control"
              onChange={(e) => {
                setArticle(e.target.files[0]);
              }}
            />
            <div>Max. Size Permitted - 10MB </div>
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
    </div>
  );
}

export default JournalPage;
