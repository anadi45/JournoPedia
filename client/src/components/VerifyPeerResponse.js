import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../css/VerifyPeerResponse.css";

function VerifyPeerResponse() {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);
	const [review1, setReview1] = useState("");
	const [review2, setReview2] = useState("");
	const [review3, setReview3] = useState("");
	const [review4, setReview4] = useState("");

	function handleDownload(e) {
		// window.location.replace(
		// 	`http://localhost:5000/downloadArticle/${articleId}`
		// );
	}

	useEffect(()=>{
		const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
		axios
		.get(`http://localhost:5000/allArticlesPeerResponseVerification`, config)
		.then((res) => {
			setArticles(res.data);
		});
	},[])
	return (
		<div>
			{
				articles.map((article)=>{
					return (
						<div className="status-div">
							<div className="article-status-div">{article.article_name}
								{article.peer_review_1 && article.peer_review_1.status?  (<div>Peer Response 1 - {article.peer_review_1.status}
									<button onClick={handleDownload(article.peer_review_1.path)}>Proof</button>
								</div>)
								:  (<div className="peer-review-status">
										{article.peer_review_1 && article.peer_review_1.path ? (<div>
											<Dropdown
											className="peer-review-status"
											options={["Yes", "No"]}
											onChange={(e) => {
												// setPassForReview(e.label);
											}}
											// value={defaultOption}
											placeholder="Verify Peer Response 1"
										/>
										<button
											className="submit-btn"
											onClick={() => {
												// handleSubmit(item._id);
											}}
										>
											Submit
										</button>
										</div>):(<div>No proof added</div>)}
								</div>)}
								{article.peer_review_2 && article.peer_review_2.status?  (<div>Peer Response 2 - {article.peer_review_2.status}</div>)
								:  (<div className="peer-review-status">
										{article.peer_review_2 && article.peer_review_2.path ? (<div>
											<Dropdown
											className="peer-review-status"
											options={["Yes", "No"]}
											onChange={(e) => {
												// setPassForReview(e.label);
											}}
											// value={defaultOption}
											placeholder="Verify Peer Response 2"
										/>
										<button
											className="submit-btn"
											onClick={() => {
												// handleSubmit(item._id);
											}}
										>
											Submit
										</button>
										</div>):(<div>No proof added</div>)}
								</div>)}
								{article.peer_review_3 && article.peer_review_3.status?  (<div>Peer Response 3 - {article.peer_review_3.status}</div>)
								:  (<div className="peer-review-status">
										{article.peer_review_3 && article.peer_review_3.path ? (<div>
											<Dropdown
											className="peer-review-status"
											options={["Yes", "No"]}
											onChange={(e) => {
												// setPassForReview(e.label);
											}}
											// value={defaultOption}
											placeholder="Verify Peer Response 3"
										/>
										<button
											className="submit-btn"
											onClick={() => {
												// handleSubmit(item._id);
											}}
										>
											Submit
										</button>
										</div>):(<div>No proof added</div>)}
								</div>)}
								{article.peer_review_4 && article.peer_review_4.status?  (<div>Peer Response 4 - {article.peer_review_4.status}</div>)
								:  (<div className="peer-review-status">
										{article.peer_review_4 && article.peer_review_4.path ? (<div>
											<Dropdown
											className="peer-review-status"
											options={["Yes", "No"]}
											onChange={(e) => {
												// setPassForReview(e.label);
											}}
											// value={defaultOption}
											placeholder="Verify Peer Response 4"
										/>
										<button
											className="submit-btn"
											onClick={() => {
												// handleSubmit(item._id);
											}}
										>
											Submit
										</button>
										</div>):(<div>No proof added</div>)}
								</div>)}
								<div>DOS -
								{new Date(article.date_of_submission).toLocaleDateString(
									"en-GB"
								)}</div>
								<div>DOR -{" "}
								{new Date(article.date_of_review).toLocaleDateString(
									"en-GB"
								)}</div>
							</div>
						</div>
					)
				})
			}
		</div>
	);
}

export default VerifyPeerResponse;
