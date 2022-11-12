import React, { useState } from "react";
import Multistep from "react-multistep";
import StepOne from "./submit article/StepOne";
import StepThree from "./submit article/StepThree";
import StepTwo from "./submit article/StepTwo";
import "../css/AddArticle.css";
import StepFour from "./submit article/StepFour";

function AddArticle() {
	// const [activeStep, setActiveStep]=useState(0)
	const steps = [
		{ title: "Submission Guidelines", component: <StepOne /> },
		{ title: "Article Details", component: <StepTwo /> },
		{ title: "Reviewer Details", component: <StepThree /> },
		{ title: "Add Author", component: <StepFour /> },
	];
	const btnStyle = {
		border: "none",
		padding: "8px 45px",
		borderRadius: "8px",
		background: "#33c2ef",
		color: "white",
	};

	return (
		<div className="add-article-div">
			<Multistep
				prevStyle={{ ...btnStyle, marginLeft: "5%" }}
				nextStyle={{
					...btnStyle,
					position: "absolute",
					right: "18%",
				}}
				activeStep={0}
				showNavigation={true}
				steps={steps}
			/>
		</div>
	);
}

export default AddArticle;
