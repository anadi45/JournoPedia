import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/JournalPage.css";
// import img from '../../public/images/'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function JournalPage(props) {
	const [img, setImg] = useState("");
	const [journalName, setJournalName] = useState("");
	const [author, setAuthor] = useState("");
	const [otherAuthor, setOtherAuthor] = useState([]);
	const [synopsis, setSynopsis] = useState("");
	const [cookies, setCookie] = useCookies(["token"]);
	let navigate = useNavigate();

	useEffect(() => {
		if (cookies.token) props.setDisplayItems(["none", "none", "inline"]);
		else props.setDisplayItems(["inline", "inline", "none"]);

		axios
			.get(`http://localhost:5000/viewJournal/${props.journalId}`)
			.then((res) => {
				console.log(res.data);
				setImg(res.data.journal.image.substr(14));
				setJournalName(res.data.journal.journal_name);
				setSynopsis(res.data.journal.synopsis);
				setAuthor(res.data.author.name);

				let otherAuthors = [];

				for (let i = 0; i < res.data.otherAuthors.length; i++) {
					otherAuthors.push(res.data.otherAuthors[i].name);
				}
				setOtherAuthor(otherAuthors);
			});
	}, []);

	return (
		<div className="journal-page-div">
			<div className="journal-container">
				<div className="journal-info-div">
					<h2 className="journal-heading">{journalName}</h2>
				</div>
			</div>
			<div className="journal-details">
				<img className="journal-img" src={`/${img}`} alt={journalName} />
				<h5>
					Editor in Chief
					<p className="fetched-details">{author}</p>
					Editorial Board
					{otherAuthor.map((author) => (
						<p className="fetched-details">{author}</p>
					))}
				</h5>
				<h5>
					Synopsis
					<p className="fetched-details">{synopsis}</p>
				</h5>
			</div>
		</div>
	);
}

export default JournalPage;
