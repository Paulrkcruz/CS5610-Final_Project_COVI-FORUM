import React from "react";
import Post from "../post";
// A function to allow for holding the posts in Thread Boards
function PostList(props) {
  const posts = props.posts;
  const listItems = posts.map((post, index) => (
    <Post key={index} post={post} />
  ));
  return <div className="post-list">{listItems}</div>;
}

export default PostList;
