import React, { useEffect } from "react";

function Account(props) {
  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline"]);
  }, []);

  return <div>Topics</div>;
}

export default Account;
