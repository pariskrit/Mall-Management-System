import React, { useContext, useEffect, useState } from "react";
import Shopform from "../../components/Form/AddShopform";
import { Context } from "../../context/ContextProvider";
import useFirestore from "../../firebase/useFirestore";
import { useForm } from "react-hook-form";

function AddShopsFormPage() {
  const [state, dispatch] = useContext(Context);
  const { docs } = useFirestore("Malls");
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const shopImages = register("shopImages");
  const handleAddMoreShop = () => {
    dispatch({ type: "Add_ShopFields" });
  };

  useEffect(() => {
    dispatch({ type: "Save_AllData", payload: docs });
  }, [docs]);

  return (
    <>
      <Shopform
        isShopsOnly={true}
        handleAddMoreShop={handleAddMoreShop}
        control={control}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        register={register}
        getValues={getValues}
        shopImages={shopImages}
      />
    </>
  );
}

export default AddShopsFormPage;
