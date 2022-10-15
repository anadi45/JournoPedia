import React, { useEffect } from "react";

function Account(props) {
  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline"]);
  }, []);

  return <div>Account</div>;
}

export default Account;
