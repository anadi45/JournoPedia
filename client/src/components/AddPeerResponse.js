import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../css/AddPeerResponse.css";
import { PuffLoader } from "react-spinners";
import axios from "axios";

function AddPeerResponse(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!cookies.token) props.setDisplayItems(["inline", "inline", "none"]);
		else props.setDisplayItems(["none", "none", "inline"]);

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
			// setJournalIds(
			// 	res.data.map((journal) => {
			// 		return journal.journal;
			// 	})
			// );
			console.log(res.data);
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
	} else
		return (
			<div className="add-peer-response-div">
				<div className="review-article-heading">Submit Peer Response</div>
				{articles.map((article) => {
					if (article.status === "Under Peer Review")
						return article.article_name;
				})}
			</div>
		);
}

export default AddPeerResponse;
