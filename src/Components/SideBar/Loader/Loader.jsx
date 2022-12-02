import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="spinnerBody">
      <div className="spinner">
        <div className="loader l1"></div>
        <div className="loader l2"></div>
      </div>
    </div>
  );
};

export default Loader;
