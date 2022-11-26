import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function AddPeerResponse(props) {
	const [cookies, setCookie] = useCookies(["token"]);
	useEffect(() => {
		if (!cookies.token) props.setDisplayItems(["inline", "inline", "none"]);
		else props.setDisplayItems(["none", "none", "inline"]);
	}, []);
	return <div>PeerResponse</div>;
}

export default AddPeerResponse;
