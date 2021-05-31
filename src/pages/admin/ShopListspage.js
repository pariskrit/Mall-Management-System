import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Shoplists from "../../components/Shoplists/Shoplists";
import useFirestore from "../../firebase/useFirestore";

function AdminShopLists() {
  const { docs } = useFirestore("Malls");
  const [selectedMall, setSelectedMall] = useState({});
  const { mallid } = useParams();

  useEffect(() => {
    const selectedMall = docs.find((mall) => mall.id === mallid);

    setSelectedMall(selectedMall);
  }, [docs]);

  return (
    <>
      <Shoplists isAdmin={true} selectedMall={selectedMall} />
    </>
  );
}

export default AdminShopLists;
