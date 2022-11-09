import React from "react";
import Popup from "reactjs-popup";
import "../css/EditInfoPopup.css";

function EditInfoPopup() {
	return (
		<div>
			<Popup
				className="popup"
				trigger={
					<div className="edit-info-div">
						<i class="fas fa-pen"></i> Edit Info
					</div>
				}
				// position="right center"
			>
				{/* <div className="info-popup-div">Popup content here !!</div>
			</Popup> */}
				{/* {(close) => ( */}
				<div className="modal">
					{/* <a className="close" onClick={close}>
						&times;
					</a> */}
					<div className="header"> Modal Title </div>
					<div className="content">
						{" "}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
						nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
						quibusdam voluptates delectus doloremque, explicabo tempore dicta
						adipisci fugit amet dignissimos?
						<br />
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Consequatur sit commodi beatae optio voluptatum sed eius cumque,
						delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
						voluptas rem alias. Vitae?
					</div>
					{/* <div className="actions">
						<button
							className="button"
							onClick={() => {
								console.log("modal closed ");
								close();
							}}
						>
							close modal
						</button>
					</div> */}
				</div>
				{/* )} */}
			</Popup>
		</div>
	);
}

export default EditInfoPopup;
