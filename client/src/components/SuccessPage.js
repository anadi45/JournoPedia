import React from "react";
import { Link } from "react-router-dom";
import "../css/SuccessPage.css";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
		window.location.reload();
	};
	return (
		<div className="success-page-div">
			<div className="success-div">
				<h3 className="success-heading">
					Success <i class="far fa-check-circle"></i>
				</h3>
				<p className="success-p">
					Your article has been submitted successfully!
				</p>
			</div>
			<div className="home-link-div" onClick={handleClick}>
				Go to Home
			</div>
		</div>
	);
}

export default SuccessPage;
