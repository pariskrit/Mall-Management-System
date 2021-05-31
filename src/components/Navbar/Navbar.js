import { Avatar } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar({ isUser = false }) {
  const history = useHistory();

  const navStyle = {
    fontWeight: "bold",
    color: "rgb(99, 99, 241)",
    textDecoration: "underline",
  };
  return (
    <div className="navbar">
      <Avatar className="avatar">{isUser ? "P" : "A"}</Avatar>
      <div className="navbar__right">
        <NavLink
          exact
          to={isUser ? "/user/home" : "/admin/home"}
          className="navbar__option"
          activeStyle={navStyle}
        >
          Home
        </NavLink>
        <NavLink
          exact
          to={isUser ? "/user/allmalls" : "/admin/allmalls"}
          className="navbar__option"
          activeStyle={navStyle}
        >
          All Malls
        </NavLink>
        <NavLink
          exact
          to={isUser ? "/user/allshops" : "/admin/allshops"}
          activeStyle={navStyle}
          className="navbar__option"
        >
          All Shops
        </NavLink>
        <NavLink
          exact
          to="/login"
          className="navbar__option"
          onClick={() => {
            localStorage.removeItem("user");
            history.push("/login");
          }}
          activeStyle={navStyle}
        >
          Logout
        </NavLink>

        <p
          onClick={() => {
            history.push(isUser ? "/admin/home" : "/user/home");
          }}
          className="navbar__option"
        >
          Switch To {isUser ? "Admin" : "User"}
        </p>
      </div>
    </div>
  );
}

export default Navbar;
