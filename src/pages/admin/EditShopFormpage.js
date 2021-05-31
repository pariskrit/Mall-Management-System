import React, { useEffect, useState } from "react";
import EditShopForm from "../../components/Form/EditShopForm";
import useFirestore from "../../firebase/useFirestore";

function EditShopFormpage() {
  const { docs } = useFirestore("Malls");
  const [allDatas, setAllDatas] = useState([]);

  useEffect(() => {
    setAllDatas(docs);
  }, [docs]);

  return (
    <>
      <EditShopForm allDatas={allDatas} />
    </>
  );
}

export default EditShopFormpage;
