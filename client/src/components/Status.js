import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { ProgressBar } from "react-milestone";
import "../css/Status.css";

function Status(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const progress = {
		Submitted: 0,
		"Under Review": 33,
		"Under Peer Review": 66,
		Accepted: 100,
		Rejected: 100,
	};
	useEffect(() => {
		props.setDisplayItems(["none", "none", "inline"]);
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
							<h4 className="article-heading">{article.article_name}</h4>
							<div className="progress-div">
								<ProgressBar
									percentage={progress[article.status]}
									milestoneCount={4}
									Milestone={() => (
										<div className="milestone-circle-incomplete">.</div>
									)}
									CurrentMilestone={() => (
										<div className="milestone-circle-current"></div>
									)}
									CompletedMilestone={() => (
										<div className="milestone-circle">
											<i class="fas fa-check"></i>
										</div>
									)}
									onMilestoneClick={(milestoneIndex) => {}}
								/>
							</div>
							<div className="progress-bar-labels-div">
								<div className="progress-bar-label">Submitted</div>
								<div className="progress-bar-label shift-right">
									Under Review
								</div>
								<div className="progress-bar-label center-text">
									Under Peer Review
								</div>
								<div className="progress-bar-label right-text">
									Accepted/Rejected
								</div>
							</div>
							{/* {article.status} */}
						</div>
					);
				})}
			</div>
		);
}

export default Status;
