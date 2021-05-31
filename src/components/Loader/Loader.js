import React from "react";
import "./loader.css";

function Loader({ percentage }) {
  return (
    <div className="loader">
      <div className="loader__bar" style={{ width: `${percentage}%` }}></div>
      <p>Uploading...</p>
    </div>
  );
}

export default Loader;
