import React, { useEffect, useState } from "react";
import useStorage from "../../firebase/useStorage";
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
