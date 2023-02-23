import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { PuffLoader } from "react-spinners";
import "../css/TopArticles.css";
import { Tabs, Tab } from "react-bootstrap";

function TopArticles(props) {
    const [cookies, setCookie] = useCookies(["token"]);
    const [isLoading, setIsLoading] = useState(true);
    const [downloads, setDownloads] = useState([]);
    const [latest, setLatest] = useState([]);
    const [score, setScore] = useState([]);

    useEffect(()=>{
        if (cookies.token) props.setDisplayItems(["none", "none", "inline"]);
		else props.setDisplayItems(["inline", "inline", "none"]);

		window.scrollTo(0, 0);
        setIsLoading(false);

        axios
            .get(`http://localhost:5000/topArticles/downloads`)
            .then((res) => {
                setDownloads(res.data);
                console.log(res.data);
            });

        axios
            .get(`http://localhost:5000/topArticles/date_of_submission`)
            .then((res) => {
                setLatest(res.data);
            });
            
        axios
            .get(`http://localhost:5000/topArticles/peer_review_score`)
            .then((res) => {
                setScore(res.data);
            });
    },[]);

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
                {/* <div className="review-article-heading">Top Articles</div> */}
                    <Tabs defaultActiveKey="downloads" id="uncontrolled-tab-example" className="mb-3 tabs">
                        <Tab eventKey="downloads" title="Top Downloads">
                            {downloads.map((article,index)=>{
                                return (
                                    <Link to={`/article/${article._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={index}	>
                                    <div className="border_article">
                                        <span>{index + 1}. </span>
                                        <span>{article.article_name}</span><br></br>
                                        <span>Downloads - {article.downloads}</span>
                                    </div>
                                </Link>
                                )
                            })}
                        </Tab>
                        <Tab eventKey="scores" title="Top Peer Acceptance">
                            {score.map((article,index)=>{
                                return (
                                    <Link to={`/article/${article._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={index}	>
                                    <div className="border_article">
                                        <span>{index + 1}. </span>
                                        <span>{article.article_name}</span><br></br>
                                        <span>Peers Accepted - {article.peer_review_score/25}/4</span>
                                    </div>
                                </Link>
                                )
                            })}
                        </Tab>
                        <Tab eventKey="recent" title="Latest Submissions">
                            {latest.map((article,index)=>{
                                return (
                                    <Link to={`/article/${article._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={index}	>
                                    <div className="border_article">
                                        <span>{index + 1}. </span>
                                        <span>{article.article_name}</span><br></br>
                                        <span>Date of Submission -{" "}
                                            {new Date(article.date_of_submission).toLocaleDateString(
                                                "en-GB"
                                            )}
                                        </span>
                                    </div>
                                </Link>
                                )
                            })}
                        </Tab>
                    </Tabs>
            </div>
        )
    }
}

export default TopArticles;