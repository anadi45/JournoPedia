import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { ProgressBar } from "react-milestone";
import "../css/Status.css";
import { Link } from "react-router-dom";

function Status(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [journalNames, setJournalNames] = useState([]);
	const [journalIds, setJournalIds] = useState([]);

	const progress = {
		Submitted: 0,
		"Under Review": 24.5,
		Rejected: 49.5,
		"Under Peer Review": 74.5,
		Accepted: 100,
		Rejected: 100,
	};

	const withdraw = (e) => {
		const article_id = e.target.value;
		const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};

		axios
			.post(`http://localhost:5000/withdrawArticle/${article_id}`, {}, config)
			.then((res) => {
				window.location.reload();
			});
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
			setArticles(res.data);
			setIsLoading(false);
			setJournalIds(
				res.data.map((journal) => {
					return journal.journal;
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
				`http://localhost:5000/journalNameByIds`,
				{
					allIds: journalIds,
				},
				config
			)
			.then((res) => {
				setJournalNames(
					journalIds.map((journalId, index) => {
						return res.data[journalId];
					})
				);
			});
	}, [journalIds]);

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
							<h4 className="article-heading">
								{article.article_name}
								{article.status !== "Withdrawn" && (
									<div className="status-btn-div">
										<button
											className="btn article-status-buttons"
											onClick={withdraw}
											value={article._id}
										>
											Withdraw Article
										</button>
										{article.status === "Under Peer Review" && (
											<Link to="/add-peer-response">
												<button className="btn article-status-buttons">
													Submit Peer Review
												</button>
											</Link>
										)}
									</div>
								)}
							</h4>
							<div className="review-artcile-journal-div">
								{journalNames[i]}
							</div>
							<div className="review-artcile-journal-div">
								DOS -{" "}
								{new Date(article.date_of_submission).toLocaleDateString(
									"en-GB"
								)}
							</div>
							{article.status === "Withdrawn" && (
								<div>
									<div className="milestone-circle-cross">
										<i class="fas fa-times-circle"></i>
									</div>
									<span className="withdrawn-span">Withdrawn</span>
								</div>
							)}
							{article.status !== "Withdrawn" && (
								<>
									<div className="progress-div">
										<ProgressBar
											percentage={progress[article.status]}
											milestoneCount={5}
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
										<div className="progress-bar-label ">Under Review</div>
										<div className="progress-bar-label">Accepted/Rejected</div>
										<div className="progress-bar-label center-text">
											Under Peer Review
										</div>
										<div className="progress-bar-label right-text">
											Peer Accepted/Rejected
										</div>
									</div>
								</>
							)}

							{/* {article.status} */}
						</div>
					);
				})}
			</div>
		);
}

export default Status;
