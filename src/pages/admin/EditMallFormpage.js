import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import EditMallForm from "../../components/Form/EditMallForm";
import { Context } from "../../context/ContextProvider";
import useFirestore from "../../firebase/useFirestore";

function EditMallFormpage() {
  const { docs } = useFirestore("Malls");
  const [state, dispatch] = useContext(Context);
  const { mallid } = useParams();

  useEffect(() => {
    if (docs.length > 0) {
      const selectedMall = docs.find((mall) => mall.id === mallid);
      dispatch({ type: "Save_Mall", payload: selectedMall });
      dispatch({ type: "Save_Shops", payload: selectedMall?.shops });
    }
  }, [docs]);

  return (
    <>
      <EditMallForm mallid={mallid} />
    </>
  );
}

export default EditMallFormpage;
