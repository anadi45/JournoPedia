import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../css/VerifyPeerResponse.css";

function VerifyPeerResponse() {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);

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
	})
	return (
		<div>
			{
				articles.map((article)=>{
					return (
						<div>
							<div>{article.article_name}
								{article.peer_review_1 ?  (<div>Peer Response 1 - {article.peer_review_1.status}</div>)
								:  (<div className="peer-review-status">
										<Dropdown
											className="peer-review-status"
											options={["Yes", "No"]}
											onChange={(e) => {
												// setPassForReview(e.label);
											}}
											// value={defaultOption}
											placeholder="Verify Peer Response"
										/>
										<button
											className="submit-btn"
											onClick={() => {
												// handleSubmit(item._id);
											}}
										>
											Submit
										</button>
								</div>)}
							</div>
							<div>DOS -
							{new Date(article.date_of_submission).toLocaleDateString(
								"en-GB"
							)}</div>
							<div>DOR -{" "}
							{new Date(article.date_of_review).toLocaleDateString(
								"en-GB"
							)}</div>
						</div>
					)
				})
			}
		</div>
	);
}

export default VerifyPeerResponse;
