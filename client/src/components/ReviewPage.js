import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/ReviewPage.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function ReviewPage() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [articles, setArticles] = useState([]);
  const [noArticlesMessage, setNoArticlesMessage] = useState(null);
  const [passForReview, setPassForReview] = useState(null);
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    // props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
        Authorization: "Bearer " + cookies.token,
      },
    };
    axios
      .get(`http://localhost:5000/allArticlesForReferral`, config)
      .then((res) => {
        // setSpinnerVisible("hidden");
        if (res.data.message === "No articles for review")
          setNoArticlesMessage(res.data.message);
        setArticles(res.data);
        console.log(res.data);
      });
  }, []);

  function handleDownload(e) {
    const articleId = e.target.value;
    window.location.replace(
      `http://localhost:5000/downloadArticle/${articleId}`
    );
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-control-allow-origin": "*",
        Authorization: "Bearer " + cookies.token,
      },
    };
    console.log(articleId);
    await axios
      .post(
        `http://localhost:5000/referArticle/${articleId}`,
        {
          option: passForReview,
        },
        config
      )
      .then((res) => {
        console.log(res);
      });
  }

  if (noArticlesMessage) {
    return (
      <div>
        <h3>{noArticlesMessage}</h3>
      </div>
    );
  } else
    return (
      <div>
        <h3>Articles to be reviewed</h3>
        <ul>
          {articles.map((item) => {
            return (
              <li>
                <h4 className="article-heading">{item.article_name}</h4>
                <button
                  className="download-btn"
                  value={item._id}
                  onClick={handleDownload}
                >
                  Download
                </button>
                {/* <form></form> */}
                <Dropdown
                  className="review-dropdown"
                  options={["YES", "NO"]}
                  onChange={(e) => {
                    setPassForReview(e.label);
                  }}
                  // value={defaultOption}
                  placeholder="Pass for peer review"
                />
                <button
                  // type="submit"
                  className="submit-btn"
                  onClick={() => {
                    console.log(item._id);
                    setArticleId(item._id);
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
}

export default ReviewPage;
