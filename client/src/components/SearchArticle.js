import React, { useEffect, useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import axios from "axios";
import "../css/SearchArticle.css";
import "react-dropdown/style.css";

function SearchArticle(props) {
	const [journals, setJournals] = useState([]);
	const [journalNames, setJournalNames] = useState([]);
	const [selectedjJournals, setSelectedJournals] = useState([]);
	const [dateOfSubmission, setDateOfSubmission] = useState({
		start: "",
		end: "",
	});
	const [articleType, setArticleType] = useState([]);
	const [status, setStatus] = useState([]);

	useEffect(() => {
		props.setDisplayItems(["none", "none", "inline"]);
		axios.get(`http://localhost:5000/getAllJournals`).then((res) => {
			console.log(res.data);
			setJournals(res.data);
			setJournalNames(
				res.data.map((journal) => {
					return { label: journal.journal_name, value: journal.journal_name };
				})
			);
		});
	}, []);

	console.log(journalNames);
	const handleOnTopicChange = (journals) => {
		let str = "";
		let journalArr = [];
		for (let c of journals) {
			if (c === ",") {
				journalArr.push(str);
				str = "";
			} else {
				str += c;
			}
		}
		journalArr.push(str);
		setSelectedJournals(journalArr);
	};

	console.log(selectedjJournals);
	return (
		<div className="search-article-div">
			<div className="search-article-heading">Looking for an article?</div>

			{/**************************************  Select Journal(s)********************************************/}
			<div className="mb-3">
				<label>Expertise</label>
				<MultiSelect
					width={"50%"}
					onChange={handleOnTopicChange}
					options={journalNames}
				/>
			</div>
			{/* <Dropdown
				options={journals.map((journal) => {
					return journal.journal_name;
				})}
				onChange={(e) => {
					for (var i = 0; i < journals.length; i++)
						if (journals[i].journal_name === e.label) setJournal(journals[i]);
				}}
				// value={defaultOption}
				placeholder="Select an option"
			/> */}

			{/**************************************  Date of Submission********************************************/}
			<div>
				<input
					type="date"
					onChange={(e) => {
						setDateOfSubmission({ ...dateOfSubmission, start: e.target.value });
					}}
				/>
				<input
					type="date"
					onChange={(e) => {
						setDateOfSubmission({ ...dateOfSubmission, end: e.target.value });
					}}
				/>
			</div>

			{/************************************** Article Type Checkbox********************************************/}
			<div>
				<input
					type="checkbox"
					id="articleType"
					name="Innovation"
					value="Innovation"
					onChange={(e) => {
						if (e.target.checked) {
							if (articleType.length === 0) setArticleType(["Innovation"]);
							else setArticleType(["Innovation", "Research"]);
						} else {
							if (articleType.length === 2) setArticleType(["Research"]);
							else setArticleType([]);
						}
					}}
				/>
				<label for="Innovation"> Innovation</label>
				<br />
				<input
					type="checkbox"
					id="articleType"
					name="Research"
					value="Research"
					onChange={(e) => {
						if (e.target.checked) {
							if (articleType.length === 0) setArticleType(["Research"]);
							else setArticleType(["Innovation", "Research"]);
						} else {
							if (articleType.length === 2) setArticleType(["Innovation"]);
							else setArticleType([]);
						}
					}}
				/>
				<label for="Research"> Research</label>
				<br></br>
			</div>
			{/************************************** Status Checkbox********************************************/}
			<div>
				<input
					type="checkbox"
					id="status"
					name="Editor Approved"
					value="Editor Approved"
					onChange={(e) => {
						if (e.target.checked) {
							if (articleType.length === 0) setArticleType(["Editor Approved"]);
							else setStatus(["Editor Approved", "Peer Approved"]);
						} else {
							if (articleType.length === 2) setArticleType(["Peer Approved"]);
							else setStatus([]);
						}
					}}
				/>
				<label for="Editor Approved"> Editor Approved</label>
				<br />
				<input
					type="checkbox"
					id="status"
					name="Peer Approved"
					value="Peer Approved"
					onChange={(e) => {
						if (e.target.checked) {
							if (articleType.length === 0) setArticleType(["Peer Approved"]);
							else setStatus(["Editor Approved", "Peer Approved"]);
						} else {
							if (articleType.length === 2) setArticleType(["Editor Approved"]);
							else setStatus([]);
						}
					}}
				/>
				<label for="Peer Approved"> Peer Approved</label>
				<br></br>
			</div>
		</div>
	);
}

export default SearchArticle;
