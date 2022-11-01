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
  const [otherAuthor, setOtherAuthor] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const [article, setArticle] = useState("");
  const [articleName, setArticleName] = useState("");
  const [reviewer, setReviewer] = useState([]);
  const [abstract, setAbstract] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [show, setShow] = useState(false);
  const [btnText,setBtnText] = useState("Add Article");
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

        let otherAuthors = [];

        for(let i=0;i<res.data.otherAuthors.length;i++) {

          otherAuthors.push(res.data.otherAuthors[i].name)
        }
        setOtherAuthor(otherAuthors);

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
        if (res.data.message === "Article added successfully!") {
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

  const buttonToggle = (e)=> {
    setShow(prev => !prev)
    if(e.target.innerText === "Add Article") {
      setBtnText("Remove Form")
    } else {
      setBtnText("Add Article")
    }
  }

  return (
    <div className="journal-page-div">

      <div className="journal-container">
        <div className="journal-info-div">
          <h2 className="journal-heading">{journalName}</h2>
        </div>
      </div>
      <div className="journal-details">
        <img className="journal-img" src={`/${img}`} alt={journalName} />
        <h5>Editor in Chief
          <p className="fetched-details">{author}</p>
          Editorial Board
          {otherAuthor.map((author) => (
            <p className="fetched-details">{author}</p>
          ))}
        </h5>
        <h5>Synopsis
          <p className="fetched-details">{synopsis}</p>
        </h5>
      </div>

      <div className="btn-container">
        <button className="btn btn-primary btn-article" onClick={ buttonToggle}>{btnText}</button>
      </div>

      {show && <div className="auth-inner add-article-form">
        
       <form>
          <h3>Add Article</h3>
          <div className="mb-3">
            <label>Article Name</label>
            <input
              type="text"
              className="form-control"
              // value={journalName}
              autoComplete="off"
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
                  placeholder={`Email Address of Author ${index + 1}`}
                ></input>
              );
            })}
          </div>

          <div className="mb-3">
            <label>Email Address of Reviewer 1</label>
            <input
              type="text"
              name="reviewer1"
              className="form-control"
              autoComplete="off"
              onChange={(e) => {
                setReviewer([...new Set([...reviewer, e.target.value])]);
              }}
            />
            <label>Email Address of Reviewer 2</label>
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
            <label>Email Address of Reviewer 3</label>
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
            <label>Email Address of Reviewer 4</label>
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
      </div> }
    </div>
  );
}

export default JournalPage;
