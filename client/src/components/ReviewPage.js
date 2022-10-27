import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function ReviewPage() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [articles, setArticles] = useState([]);

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
        setArticles(res.data);
        console.log(res.data);
      });
  }, []);

  function handleDownload(e) {
    const articleId = e.target.value;
    axios
      .get(`http://localhost:5000/downloadArticle/${articleId}`)
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div>
      <ul>
        {articles.map((item) => {
          return (
            <li>
              {item.article_name}
              <button value={item._id} onClick={handleDownload}>
                Download
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ReviewPage;
