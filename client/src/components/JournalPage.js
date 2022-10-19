import React, { useEffect } from "react";

function JournalPage(props) {
  useEffect(() => {
    props.setDisplayItems(["none", "none", "inline", "inline", "inline"]);
  }, []);
  return <div>JournalPage</div>;
}

export default JournalPage;
