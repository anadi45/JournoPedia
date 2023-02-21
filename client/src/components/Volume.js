import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { PuffLoader } from "react-spinners";
import "../css/Volumes.css";

function Volume(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	const { journal_id, year } = useParams();
	const [articles, setArticles] = useState([]);
	const [authorIDs, setAuthorIDs] = useState([]);
	const [authorNames, setAuthorNames] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (cookies.token) props.setDisplayItems(["none", "none", "inline"]);
		else props.setDisplayItems(["inline", "inline", "none"]);

		window.scrollTo(0, 0);
		axios
			.get(`http://localhost:5000/${journal_id}/volume/${year}`)
			.then((res) => {
				console.log(res.data);
				setArticles(res.data);
				setAuthorIDs(
					res.data.map((author) => {
						return author.submitted_by;
					})
				);
			});
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
				setAuthorNames(
					res.data.map((author) => {
						return author.name;
					})
				);
				setIsLoading(false);
			});
	}, [authorIDs]);

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
			<div className="volumes-div">
				<div className="review-article-heading">Articles</div>
				<div className="volume-articles-div">
					{articles.map((article, index) => {
						return (
							<Link to={`/article/${article._id}`} style={{ color: 'inherit', textDecoration: 'inherit'}} key={index}	>
								<div className="border_article">
									<span>{index + 1}. </span>
									<span>{article.article_name}</span><br></br>
									<span className="authors">{authorNames[index]}
										{article.authors.map((author,idx) => {
											return (
												<span key={idx} className="authors">
													,{author.name}
												</span>
											);
										})}
									</span>
									<div>
										Date of Submission -{" "}
										{new Date(article.date_of_submission).toLocaleDateString(
											"en-GB"
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		);
}

export default Volume;
