import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/Volumes.css";

function Volume(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	const { journal_id, year } = useParams();
	const [articles, setArticles] = useState([]);
	const [authorIDs, setAuthorIDs] = useState([]);
	const [authorNames, setAuthorNames] = useState([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		axios
			.get(`http://localhost:5000/${journal_id}/volume/${year}`)
			.then((res) => {
				// console.log(res.data);
				setArticles(res.data);
				setAuthorIDs(
					res.data.map((author) => {
						return author.submitted_by;
					})
				);
			});
		// console.log(authorIDs);
		// const authorFetch = async () => {

		// };
		// authorFetch();
	}, []);

	useEffect(() => {
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
					allIds: authorIDs,
				},
				config
			)
			.then((res) => {
				// console.log(res.data);
				setAuthorNames(
					res.data.map((author) => {
						return author.name;
					})
				);
			});
	}, [authorIDs]);

	function handleDownload(e) {
		const articleId = e.target.value;
		window.location.replace(
			`http://localhost:5000/downloadArticle/${articleId}`
		);
	}

	return (
		<div className="volumes-div">
			<div className="review-article-heading">Articles</div>
			<div className="volume-articles-div">
				{articles.map((article, index) => {
					return (
						<div class = "border_article">
							<span>{index + 1}. </span>
							<span>{article.article_name}</span>
							<div>Author - {authorNames[index]}</div>
							<div>Co-Authors - </div>
							{article.authors.map((author) => {
								return (
									<p>
										{author.name}, {author.email}, {author.country} <br></br>
									</p>
								);
							})}
							<div>
								Date of Submission -{" "}
								{new Date(article.date_of_submission).toLocaleDateString(
									"en-GB"
								)}
							</div>
							<div>
								Date of Issue -{" "}
								{new Date(article.date_of_review).toLocaleDateString(
									"en-GB"
								)}
							</div>
							<div>Status - {article.status}</div>
							<button
								className="download-btn"
								value={article._id}
								onClick={handleDownload}
							>
								Download
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Volume;
