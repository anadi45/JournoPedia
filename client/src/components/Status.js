import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import "../css/Status.css";

function Status() {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
		axios.get(`http://localhost:5000/articleStatus`, config).then((res) => {
			console.log(res.data);
			setArticles(res.data);
			setIsLoading(false);
		});
	}, []);

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
	} else if (articles.length === 0) {
		return (
			<div className="status-div">
				<img className="no-articles-pic" src="images/no-articles.png" />
				<h3>No Articles Submitted</h3>
			</div>
		);
	} else
		return (
			<div className="status-div">
				<div className="review-article-heading">Submission Status</div>
				{articles.map((article, i) => {
					return (
						<div key={i} className="article-status-div">
							<h4>{article.article_name}</h4>
							{article.status}
							{/* <div>hello</div> */}
						</div>
					);
				})}
			</div>
		);
}

export default Status;
