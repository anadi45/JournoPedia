import React, { useEffect } from "react";

function Account(props) {
  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline"]);
  }, []);

  return <div>Topics</div>;
}

export default Account;
