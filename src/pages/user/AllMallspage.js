import React from "react";
import MallsLists from "../../components/MallsLists/MallsLists";
import Navbar from "../../components/Navbar/Navbar";

function AllMallspage() {
  return (
    <>
      <Navbar isUser />
      <MallsLists />
    </>
  );
}

export default AllMallspage;
