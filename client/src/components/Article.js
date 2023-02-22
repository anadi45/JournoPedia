import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { PuffLoader } from "react-spinners";
import "../css/Article.css";

function Article(props) {
    const [cookies, setCookie] = useCookies(["token"]);
	const { article_id} = useParams();
	const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState();
    const [recommendArticles, setRecommendedArticles] = useState([]);
    const [recommendLoading, setRecommendLoading] = useState(true);
    const [authorId, setAuthorId]  = useState("");
    const [author, setAuthor] = useState("");
    const [journalId, setJournalId] = useState("");
    const [journal, setJournal] = useState("");

    function handleDownload(e) {
		const articleId = e;
        console.log(e);
		window.location.replace(
			`http://localhost:5000/downloadArticle/${articleId}`
		);
	}

    function handleClick(article_id) {
        window.location.replace(`/article/${article_id}`);
    }

    useEffect(() => {
		if (cookies.token) props.setDisplayItems(["none", "none", "inline"]);
		else props.setDisplayItems(["inline", "inline", "none"]);

		window.scrollTo(0, 0);
		axios
			.get(`http://localhost:5000/viewArticle/${article_id}`)
			.then((res) => {
                setArticle(res.data);
                setAuthorId(res.data.submitted_by);
                setJournalId(res.data.journal);
                setIsLoading(false);
			});

        axios
			.get(`http://localhost:5000/recommendArticles/${article_id}`)
            .then((res) => {
                setRecommendedArticles(res.data);
                setRecommendLoading(false);
			});

	}, []);

    useEffect(()=>{
        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
        axios
            .post(
                `http://localhost:5000/getAllAuthors`,
                {
                    allIds: authorId,
                },config
            )
            .then((res) => {
                setAuthor(res.data[0].name);
            });
        axios
            .post(
                `http://localhost:5000/journalNameByIds`,
                {
                    allIds: journalId,
                },config
            )
            .then((res) => {
                for (const key in res.data) {
                    setJournal(res.data[key]);
                }
            });
    },[authorId,journalId]);

    if (isLoading) {
		return (
			<div className="loading-div">
				<PuffLoader
					cssOverride={{ display: "inline-block" }}
					loading={true}
					size={40}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>{" "}
				<span className="loading">Loading</span>
			</div>
		);
	} else {
        return (
            <div className="volumes-div">
                <div className="review-article-heading">{article.article_name}</div>
                <div className="volume-articles-div">
                    <p><span>Journal Name - </span>{journal}</p>
                    <p><span>Abstract - </span>{article.abstract}</p>
                    <p><span>Author - </span>{author}</p>
                    <p><span>Co-Authors :- </span><br></br> 
                        {article.authors.map((author,index)=> {
                            return (
                                <>
                                    <span key={index} className="authors">{author.name}, {author.email}, {author.country}.</span> <br></br>
                                </>
                            )
                        })}
                    </p>
                    <p><span>Article Type - </span>{article.article_type}</p>
                    <p><span>Peer Reviewers :- </span><br></br> 
                        {article.peer_choice.map((reviewer,index) => {
                            return (
                                <>
                                    <span key={index} className="reviewers">{reviewer.name}, {reviewer.email}, {reviewer.country}.</span> <br></br>
                                </>
                            )
                        })}
                    </p>
                    <p><span>Peer Review Results :- </span><br></br>
                        1.{article.peer_review_1.status==="Yes"?<span className="status">Accepted</span>:<span className="status">Not Accepted</span>}<br></br>
                        2.{article.peer_review_2.status==="Yes"?<span className="status">Accepted</span>:<span className="status">Not Accepted</span>}<br></br>
                        3.{article.peer_review_3.status==="Yes"?<span className="status">Accepted</span>:<span className="status">Not Accepted</span>}<br></br>
                        4.{article.peer_review_4.status==="Yes"?<span className="status">Accepted</span>:<span className="status">Not Accepted</span>}<br></br>
                    </p>
                    <p>
                        <span>Date of Submission -</span>{" "}
                        {new Date(article.date_of_submission).toLocaleDateString(
                            "en-GB"
                        )}
                    </p>
                    <p><span>Downloads - </span>{article.downloads}</p>
                    <button className="download-btn" value={article._id} onClick={()=>{handleDownload(article._id)}}>
                        Download <i class="fas fa-download"></i>
                    </button>
                </div>
                <div className="review-article-heading">Related Articles</div>

                <div className="volume-articles-div">
					{recommendLoading ? 
                        (
                            <div className="loading-div">
                                <PuffLoader
                                    cssOverride={{ display: "inline-block" }}
                                    loading={true}
                                    size={40}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />{" "}
                                <span className="loading">Loading</span>
                            </div>
                        ):recommendArticles.map((article, index) => {
                            return (                        
                                <div className="border_article" onClick={()=>{handleClick(article._id)}}>
                                    <span>{index + 1}. </span>
                                    <span>{article.article_name}</span><br></br>
                                    <div>
                                        Date of Submission -{" "}
                                        {new Date(article.date_of_submission).toLocaleDateString(
                                            "en-GB"
                                        )}
                                    </div>
                                </div>
                            );
					})}
				</div>
            </div>
        )
    }
}

export default Article;