import React, { useEffect, useRef } from "react";
import "./search-bar.css";

const SearchBar = (props) => {
  const inputRef = useRef();
  const SearchButtonRef = useRef();

  const triggerEvent = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      SearchButtonRef.current.click();
    }
  };
// Setup search
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
    <div className="search-bar">
      <input
        ref={inputRef}
        id="search"
        alt="search"
        name="search"
        placeholder="Search for a post"
        aria-label="Search for post"
        type="text"
        value={props.value}
        onChange={(event) => props.onSearch(event.target.value)}
      ></input>
      <button
        ref={SearchButtonRef}
        aria-label="Search in Posts"
        onClick={props.search}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
