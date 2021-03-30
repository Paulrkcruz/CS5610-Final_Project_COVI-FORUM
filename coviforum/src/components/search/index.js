import React, { useEffect, useRef } from "react";
import "./search.css";
// Search bar
// Allows a user to search for forums of their choice
const Search = (props) => {
  const inputRef = useRef();
  const SearchButtonRef = useRef();
// Enter key
  const triggerEvent = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      SearchButtonRef.current.click();
    }
  };
// Setup variables
  const initialSetup = () => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keyup", triggerEvent);
      return () => {
        inputRef.current.removeEventListener("keyup", triggerEvent);
      };
    }
  };
  useEffect(initialSetup, []);
  return (
    <div className="search">
      <input
        ref={inputRef}
        id="search"
        alt="search"
        name="search"
        placeholder="Search for boards of your choice"
        aria-label="Search For Board"
        type="text"
        value={props.value}
        onChange={(event) => props.onSearch(event.target.value)}
      ></input>
      <button
        ref={SearchButtonRef}
        aria-label="Search in Boards"
        onClick={props.search}
      >
        Search
      </button>
    </div>
  );
};
export default Search;
