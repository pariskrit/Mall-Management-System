import React from "react";
import "./inputfield.css";

function InputField({ placeholder = "Search", onSearchInputChange }) {
  return (
    <div className="inputdiv">
      <input
        type="text"
        placeholder={placeholder}
        className="inputfield"
        onChange={onSearchInputChange}
      />
    </div>
  );
}

export default InputField;
