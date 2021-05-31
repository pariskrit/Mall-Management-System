import React, { useEffect, useState } from "react";
import useFirestore from "../../firebase/useFirestore";
import Shop from "../../components/Shop/Shop";

function Shoppage({ location }) {
  const {
    state: { shopid, mallid },
  } = location;

  const { docs } = useFirestore("Malls");
  const [shops, setShops] = useState([]);

  useEffect(() => {
    if (shops?.length === 0 && docs.length > 0) {
      const selectedMall = docs.find((mall) => mall?.id === mallid);
      setShops(selectedMall?.shops?.find((shop) => shop?.id === shopid));
    }
  }, [docs]);

  return (
    <>
      <Shop shops={shops} mallid={mallid} isAdmin="true" />
    </>
  );
}

export default Shoppage;
