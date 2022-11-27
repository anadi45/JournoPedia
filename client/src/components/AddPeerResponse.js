import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../css/AddPeerResponse.css";
import { PuffLoader } from "react-spinners";
import axios from "axios";

function AddPeerResponse(props) {
	const [cookies, setCookie] = useCookies(["token", "articleId"]);
	const [article, setArticle] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [counter, setCounter] = useState(0);
	const [numAuthors, setNumAuthors] = useState(0);
	const [articleId, setArticleId] = useState(props.openedArticleId);

	useEffect(() => {
		if (!cookies.token) props.setDisplayItems(["inline", "inline", "none"]);
		else props.setDisplayItems(["none", "none", "inline"]);

		setCookie("articleId", props.openedArticleId, { path: "/" });
		// console.log(localStorage.getItem("SelectedArticleId"));
		// if (localStorage.getItem("SelectedArticleId")) {
		// 	setArticleId(localStorage.getItem("SelectedArticleId"));
		// } else
		// 	localStorage.setItem(
		// 		"SelectedArticleId",
		// 		JSON.stringify(props.openedArticleId)
		// 	);

		console.log("article id : ", cookies.articleId);
		const config = {
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
		axios
			.get(`http://localhost:5000/viewArticle/${cookies.articleId}`, config)
			.then((res) => {
				console.log(res.data);
				setIsLoading(false);
				setArticle(res.data);
			});
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		setCounter(counter + 1);
		setNumAuthors(numAuthors + 1);
	};

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
	} else
		return (
			<div className="add-peer-response-div">
				<div className="review-article-heading">
					{/* Submit Peer Response for "{article.article_name}" */}
				</div>
				{/* {articles.map((article) => {
					if (article.status === "Under Peer Review")
						return article.article_name;
				})} */}
				<>
					<div className="auth-inner mb-3">
						<button
							className="btn btn-primary add-author-btn"
							onClick={handleClick}
						>
							Add New Author
						</button>

						{Array.from(Array(counter)).map((c, index) => {
							return (
								<div className="reviewer-div">
									<label className="reviewer-heading">Author {index + 1}</label>
									<input
										type="text"
										// name="reviewer1"
										placeholder="Name"
										className="form-control reviewer-input reviewer-name"
										autoComplete="off"
										value={"reviewer-1"}
									/>
								</div>
							);
						})}
					</div>
					<button
						type="submit"
						className="btn btn-primary final-submit-btn"
						// onClick={props.handleSubmit}
					>
						Submit
					</button>
				</>
			</div>
		);
}

export default AddPeerResponse;
