import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/Profile.css";
import { PuffLoader } from "react-spinners";
import EditInfoPopup from "./EditInfoPopup";

function Profile() {
	const [cookies, setCookie] = useCookies(["token"]);
	const [userInfo, setUserInfo] = useState({});
	const [spinnerVisible, setSpinnerVisible] = useState("visible");

	useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookies.token,
			},
		};
		axios.get(`http://localhost:5000/userDetailsToken`, config).then((res) => {
			console.log(res.data);
			setUserInfo(res.data);
			setSpinnerVisible("hidden");
		});
	}, []);

	if (spinnerVisible === "visible") {
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
			<div className="profile-div">
				<div className="user-image-div">
					<img src="images/user-pic.png" className="user-pic"></img>
					<div className="add-photo-div">
						<i class="fas fa-camera"></i> Add Photo
					</div>
				</div>
				<div className="user-name-div">
					<div>
						<h1>{userInfo.name}</h1>
					</div>
					<div className="designation-div">
						<h4>
							{userInfo.designation} at {userInfo.institute}
						</h4>
					</div>
					<div className="country-div">
						From{" "}
						<img
							className="country-flag"
							src={`https://www.sciencekids.co.nz/images/pictures/flags680/${userInfo.country}.jpg`}
						/>{" "}
						{userInfo.country}
					</div>
				</div>
				<div>
					<div className="circle" style={{ border: "8px solid #00D100" }}>
						{userInfo.total_accepted} <span>Accepted Journals</span>
					</div>
					<div className="circle" style={{ border: "8px solid #FF0000" }}>
						{userInfo.total_rejected} <span>Rejected Journals</span>
					</div>
					<div className="circle" style={{ border: "8px solid blue" }}>
						{userInfo.total_submitted} <span>Submitted Journals</span>
					</div>
				</div>
				<div className="more-info-div">
					<h4>More Information</h4>

					<div className="more-info-headings">
						<div>
							<span>Email</span>
						</div>
						<div>
							<span>Phone No</span>
						</div>
						<div>
							<span>Expertise</span>
						</div>
					</div>
					<div className="more-info">
						<div>{userInfo.email}</div>
						<div>{userInfo.phone}</div>
						<div>
							{userInfo.expertise &&
								userInfo.expertise.map((topic, i) => {
									return (i > 0 ? ", " : "") + topic;
								})}
						</div>
					</div>

					<EditInfoPopup />
				</div>
			</div>
		);
}

export default Profile;
