import React, { useEffect, useState } from "react";
import axios from "axios";

function AccountPage() {
  const [posts, setPosts] = useState([]);
  // const fetchChats = async () => {
  //   const chats = await axios.get("/api/chats");
  //   console.log(chats);
  //   setChats(chats.data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div>
      {/* {posts.map((post) => (
        <div key={post._id}>{post.chatName}</div>
      ))} */}
    </div>
  );
}

export default AccountPage;
