import React from "react";
// Header View function
// Allows User to see header
function HeaderView(props) {
  return (
    <div className="header-view">
      <h1>{props.title}</h1>
    </div>
  );
}

export default HeaderView;
