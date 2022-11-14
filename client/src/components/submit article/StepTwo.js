import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
// import "../../css/AddArticle.css";
import "../../css/StepTwo.css";

function StepTwo(props) {
	// const [inputValues, setInputValues] = useState([]);
	const [article, setArticle] = useState("");
	const [articleName, setArticleName] = useState("");
	const [reviewer, setReviewer] = useState([]);
	const [abstract, setAbstract] = useState("");
	const [journals, setJournals] = useState([]);
	// const [selectedJournal, setSelectedJournal] = useState({});
	// const [cookies, setCookie] = useCookies(["token"]);
	const navigate = useNavigate();
	// const [counter, setCounter] = useState(0);
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const config = {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data",
	// 			"access-control-allow-origin": "*",
	// 			Authorization: "Bearer " + cookies.token,
	// 		},
	// 	};

	// 	let authorList = Object.values(inputValues);

	// 	await axios
	// 		.post(
	// 			`http://localhost:5000/addArticle`,
	// 			{
	// 				article_name: articleName,
	// 				peer_choice: reviewer,
	// 				article: article,
	// 				abstract: abstract,
	// 				// journal_id: props.journalId,
	// 				authors: authorList,
	// 			},
	// 			config
	// 		)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			if (res.data.message === "Article added successfully!") {
	// 				navigate("/");
	// 			}
	// 		});
	// };

	// const handleOnChange = (e) => {
	// 	const abc = {};
	// 	abc[e.target.className] = e.target.value;
	// 	setInputValues({ ...inputValues, ...abc });
	// };

	// const handleClick = (e) => {
	// 	e.preventDefault();
	// 	setCounter(counter + 1);
	// };

	useEffect(() => {
		axios.get(`http://localhost:5000/getAllJournals`).then((res) => {
			console.log(res.data);
			setJournals(res.data);
		});
	}, []);

	return (
		<div className="auth-inner add-article-form">
			<form>
				<h3>Add Article</h3>
				<label>Select Journal</label>
				<div className="mb-3">
					<Dropdown
						options={journals.map((journal) => {
							return journal.journal_name;
						})}
						onChange={(e) => {
							for (var i = 0; i < journals.length; i++)
								if (journals[i].journal_name === e.label)
									props.setJournal(journals[i]);
						}}
						// value={defaultOption}
						placeholder="Select an option"
					/>
				</div>
				<div className="mb-3">
					<label>Article Name</label>
					{/* getAllJournals */}
					<input
						type="text"
						className="form-control"
						// value={journalName}
						autoComplete="off"
						name="article_name"
						onChange={(e) => {
							props.setArticleName(e.target.value);
						}}
					/>
				</div>

				<div className="mb-3">
					<label>Abstract</label>
					<textarea
						type="text"
						className="form-control"
						value={abstract}
						name="abstract"
						onChange={(e) => {
							// setMessageDisplay("none");
							setAbstract(e.target.value);
							props.setAbstract(e.target.value);
						}}
					/>
				</div>

				<div className="mb-3">
					<label>Upload Article</label>
					<input
						type="file"
						name="article"
						className="form-control"
						onChange={(e) => {
							props.setArticle(e.target.files[0]);
						}}
					/>
					<div>Max. Size Permitted - 10MB </div>
				</div>
				{/* <div className="d-grid">
					<button
						className="btn btn-primary"
						type="submit"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div> */}
			</form>
		</div>
	);
}

export default StepTwo;
