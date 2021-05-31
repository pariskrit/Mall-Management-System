import React from "react";
import { useHistory } from "react-router";
import "./container.css";
import CircularProgress from "@material-ui/core/CircularProgress";

function Container({
  heading,
  malls,
  showViewAll = false,
  render,
  path = "/user/allmalls",
  isLoading,
}) {
  const history = useHistory();

  return (
    <div className="malls">
      <h2 className="malls__title">{heading}</h2>

      {malls?.length === 0 && heading === "Malls" && !isLoading && (
        <h1>No Malls Available</h1>
      )}

      {malls?.length === 0 && heading === "Shops" && !isLoading && (
        <h1>No Shops Available</h1>
      )}
      {isLoading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      <div className="malls__lists">{render && render(malls)}</div>

      {showViewAll && (
        <h2 className="malls__viewall" onClick={() => history.push(path)}>
          View All
        </h2>
      )}
    </div>
  );
}

export default Container;
